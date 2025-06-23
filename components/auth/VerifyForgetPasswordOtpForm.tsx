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

// Zod schema for OTP verification
const OTPSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

const VerifyForgetPasswordOtpForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const email = params?.email as string;
  //   const { email } = useParams(); // Extract email from URL (e.g., /auth/verify-otp/jibola619@gmail.com)

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof OTPSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          email: decodeURIComponent(email as string), // Decode URL-encoded email
          otp: values.otp,
        }
      );

      if (res.status === 200) {
        setLoading(false);
        setSuccess("Email verified successfully!");
        startTransition(() => {
          router.push(
            `/auth/set-password/${decodeURIComponent(email as string)}`
          );
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

      {/* Verify OTP Form */}
      <div className="relative z-10">
        <CardWrapper
          headerLabel="Verify Your Email"
          backButtonLabel="Back to Login"
          backButtonHref="/auth/login"
          showSocial={false}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="py-[1.3rem]"
                      value={decodeURIComponent(email as string)}
                      disabled={true}
                      type="email"
                    />
                  </FormControl>
                </FormItem> */}
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input
                          className="py-[1.3rem]"
                          disabled={isPending || loading}
                          placeholder="Enter 6-digit OTP"
                          {...field}
                          type="text"
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
                {loading ? "Verifying..." : "Verify OTP"}
                {loading && <div className="lds-hourglass ms-3"></div>}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </main>
  );
};

export default VerifyForgetPasswordOtpForm;
