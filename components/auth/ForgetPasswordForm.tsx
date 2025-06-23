"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
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

// Zod schema for email input
const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        values
      );

      if (res.status === 200) {
        setLoading(false);
        setSuccess("OTP sent to your email for password reset.");
        startTransition(() => {
          router.push(`/auth/verify-forgotpassword/${encodeURIComponent(values.email)}`);
        });
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-gray-500">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Forgot Password Form */}
      <div className="relative z-10">
        <CardWrapper
          headerLabel="Reset Your Password"
          backButtonLabel="Back to Login"
          backButtonHref="/auth/login"
          showSocial={false}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="py-[1.3rem]"
                          disabled={isPending || loading}
                          placeholder="example@email.com"
                          {...field}
                          type="email"
                        />
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
                {loading ? "Sending OTP..." : "Send OTP"}
                {loading && <div className="lds-hourglass ms-3"></div>}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;