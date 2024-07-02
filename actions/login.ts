"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas/route";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/user";
import { error } from "console";
import { generateKey } from "crypto";
import {
  generateTwoFactorToken,
  generateVerificationByToken,
} from "@/lib/token";
import { sendVerification } from "@/lib/mail";
import { sendTwoFactorTokenMail } from "@/lib/TwoFactorMail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { prisma } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>,callbackUrl:string | null) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }

  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  if (existingUser) {
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationByToken(
        existingUser.email
      );

      await sendVerification(verificationToken.email, verificationToken.token);

      return { success: "Email Not Verified, Verification mail sent" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return { error: "Invalid code!" };
        }

        if (twoFactorToken.token !== code) {
          return { error: "Invalid code!" };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { error: "Code expired" };
        }

        await prisma.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await prisma.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await prisma.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenMail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return { twoFactor: true };
      }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "http://localhost:3000/settings",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
