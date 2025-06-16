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
import Cookies from "js-cookie";
import { useState, useTransition } from "react";

// import heroimage from "../../assets/crowdfund/authimage.jpg";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schema/route";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";
import { useAuth } from "@/hooks/AuthContext";

const LoginForm = () => {
  const { setAuth } = useAuth(); // use it
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
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
        // Cookies.set("user", res.data.user._id, { expires: 7 });
        // Cookies.set("token", res.data.token, { expires: 7 });
        setAuth(res.data.user, res.data.token); // store in context + cookies

        router.push("/admin");
      } else {
        console.log("other error", res);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <main
      // style={{
      //   backgroundImage: `url(${heroimage.src})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   position: "relative",
      // }}
      className="flex h-[100vh] flex-col items-center justify-center bg-gray-500"
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60" // Semi-transparent black overlay
      ></div>

      {/* Login Form */}
      <div className="relative z-10">
        {" "}
        {/* Ensure the form is above the overlay */}
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
                          disabled={isPending}
                          placeholder="example@email.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="py-[1.3rem]"
                          disabled={isPending}
                          placeholder="*****"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <Button
                disabled={loading}
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
