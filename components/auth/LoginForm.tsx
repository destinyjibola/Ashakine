"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schema/route";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";
import { useAuth } from "@/hooks/AuthContext";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import react-icons

const LoginForm = () => {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false); // State for toggle

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        values
      );

      if (res.status === 200) {
        setLoading(false);
        setAuth(res.data.user, res.data.token);
        startTransition(() => {
          router.push("/admin");
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 403 && error.response?.data?.verificationSent) {
        setSuccess(error.response.data.message);
        startTransition(() => {
          router.push(error.response.data.redirect);
        });
      } else {
        setError(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-gray-500">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Form */}
      <div className="relative z-10">
        <CardWrapper
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
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
                            placeholder="******"
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
                      <div className="text-right">
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-primarycolor hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
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
                {loading ? "Logging In" : "Log In"}
                {loading && <div className="lds-hourglass ms-3"></div>}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </main>
  );
};

export default LoginForm;