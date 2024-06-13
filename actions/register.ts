"use server";
import bcrypt from "bcryptjs"
import * as z from "zod";

import { RegisterSchema } from "@/schemas/route";
import { prisma } from "@/lib/db";
import { generateVerificationByToken } from "@/lib/token";
import { sendVerification } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }

  const {email,password,name} = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password,10);

  const existingUser = await prisma.user.findUnique({
    where:{
        email
    }
  });

  if(existingUser){
    return { error: "Email already in use"};
  }

  await prisma.user.create({
    data:{
        name, email, password:hashedPassword
    }
  })

  // const verificationToken = await generateVerificationByToken(email);
  // await sendVerification(verificationToken.email,verificationToken.token);
  // return { success: "Email Not Verified!!! Verification mail sent" };
  return { success: "Registration Successful"};

 

};
