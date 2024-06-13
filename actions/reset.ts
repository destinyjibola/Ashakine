"use server";
import * as z from "zod";
import { ResetSchema } from "@/schemas/route";
import { getUserByEmail } from "@/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendForgotPasswordMail } from "@/lib/ForgotPasswordMail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  // todo:  generate token and send mail

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendForgotPasswordMail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
