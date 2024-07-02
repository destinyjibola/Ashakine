"use server";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendVerification } from "@/lib/mail";
import { generateVerificationByToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas/route";
import { getUserByEmail, getUserById } from "@/user";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exist" };
    }

    const verificationToken = await generateVerificationByToken(values.email);

    await sendVerification(verificationToken.email, verificationToken.token);

    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    const hashedPassword = await bcrypt.hash(
        values.newPassword,10
    );

    values.password = hashedPassword;
    values.newPassword = undefined


  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated" };
};
