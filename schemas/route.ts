import { UserRole } from "@prisma/client";
import * as z from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().optional(),
  goalAmount: z.number().min(0, "Goal amount cannot be negative"),
  // enddate: z.string().refine(date => !isNaN(Date.parse(date)), {
  //   message: "Invalid end date"
  // }),
  budgetDetails: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export const SettingsSchema = z
  .object({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().optional(),
    homeAddress: z.string().optional(),
    phoneNumber: z.string().optional(),
    accountNumber: z.string().optional(),
    bank: z.string().optional(),
    bankName: z.string().optional(),
    idNumber: z.number().optional(),
    idFront: z.string().optional(),
    idBack: z.string().optional(),
  })
  // .refine(
  //   (data) => {
  //     if (data.password && !data.newPassword) {
  //       return false;
  //     }

  //     return true;
  //   },
  //   {
  //     message: "New Password is required",
  //     path: ["newPassword"],
  //   }
  // )
  // .refine(
  //   (data) => {
  //     if (!data.password && data.newPassword) {
  //       return false;
  //     }

  //     return true;
  //   },
  //   {
  //     message: "Password is required",
  //     path: ["newPassword"],
  //   }
  // );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  fullName: z.string().min(4, {
    message: "name is required",
  }),
});



export const BillingSchema = z.object({
  fullName: z.string().min(1, { message: "First name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  isAnonymous: z.boolean().optional().default(false), // Optional, defaults to false
  amount: z.number().positive({ message: "Amount must be greater than 0" }),
});
