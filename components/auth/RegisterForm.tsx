"use client";
import { RegisterSchema } from "@/schemas/route";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import heroimage from "../../assets/crowdfund/hero-image.svg";
import "react-toastify/dist/ReactToastify.css";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { useState, useTransition } from "react";
import Cookies from "js-cookie";
// import { register } from "@/actions/register";
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    // console.log(values)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/regUser`, values);

      if (res.status === 200) {
        setLoading(false);
        console.log(res.data.user);
        router.push("/auth/login");
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
      style={{
        backgroundImage: `url(${heroimage.src})`,
        backgroundSize: "cover",
        position: "relative",
      }}
      className="flex h-[100vh] flex-col items-center justify-center bg-gray-500"
    >
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-[1.3rem]"
                        disabled={loading}
                        placeholder="john doe"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-[1.3rem]"
                        disabled={loading}
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
                        disabled={loading}
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={loading}
              type="submit"
              className="w-full rounded-[12px]  py-[1.3rem] bg-primary-color paragraph-7"
            >
              {loading ? "Registering" : "Register"}{" "}
              {loading && <div className="lds-hourglass ms-3"></div>}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};

export default RegisterForm;
