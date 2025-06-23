"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import react-icons

// Zod schema for password reset
const SetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false); // State for password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password toggle
  const router = useRouter();
  const params = useParams();
  const email = params?.email as string;

  const form = useForm<z.infer<typeof SetPasswordSchema>>({
    resolver: zodResolver(SetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SetPasswordSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/set-password`,
        {
          email: decodeURIComponent(email), // Decode URL-encoded email
          newPassword: values.password,
        }
      );

      if (res.status === 200) {
        setLoading(false);
        setSuccess("Password reset successful!");
        startTransition(() => {
          router.push("/auth/login");
        });
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-gray-500">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Set Password Form */}
      <div className="relative z-10">
        <CardWrapper
          headerLabel="Set New Password"
          backButtonLabel="Back to Login"
          backButtonHref="/auth/login"
          showSocial={false}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="py-[1.3rem] pr-10"
                            disabled={isPending || loading}
                            placeholder="Enter new password"
                            {...field}
                            type={showPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="py-[1.3rem] pr-10"
                            disabled={isPending || loading}
                            placeholder="Confirm new password"
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                          >
                            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Button
                disabled={loading || isPending}
                type="submit"
                className="w-full rounded-[12px] py-[1.3rem] bg-primarycolor text-white paragraph-7"
              >
                {loading ? "Resetting Password..." : "Reset Password"}
                {loading && <div className="ms-3 lds-hourglass"></div>}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </main>
  );
};

export default SetPasswordForm;