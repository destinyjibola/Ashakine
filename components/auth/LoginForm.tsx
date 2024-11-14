"use client";
import { LoginSchema } from "@/schemas/route";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
// import { login } from "@/actions/login";
import { useState, useTransition } from "react";

import Link from "next/link";
import heroimage from "../../assets/crowdfund/hero-image.svg";

const LoginForm = () => {


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

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    console.log(values)

    //   login(values,callbackUrl)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data?.error);
    //       }

    //       if (data?.success) {
    //         form.reset();
    //         setSuccess(data?.success);
    //       }

    //       if (data?.twoFactor) {
    //         setShowTwoFactor(true);
    //       }
    //       toast.info(data?.error, {
    //         theme: "light",
    //       });
    //       toast.info(data?.success, {
    //         theme: "light",
    //       });
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });
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
        headerLabel="Welcome back"
        backButtonLabel="Dont have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* {showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="123456"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </>
            )} */}
              {/* {!showTwoFactor && ( */}
              {/* <> */}
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
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              {/* </> */}
              {/* )} */}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            {/* {!showTwoFactor && ( */}
            <Button
              disabled={isPending}
              type="submit"
              className="w-full rounded-[12px] py-[1.3rem] bg-primary-color paragraph-7"
            >
              {isPending ? "Logging In" : "Log In"}
              {isPending && <div className="lds-hourglass ms-3"></div>}
            </Button>
            {/* )} */}
            {/* {showTwoFactor && (
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Confirming" : "Confirm"}
              {isPending && <div className="lds-hourglass ms-3"></div>}
            </Button>
          )} */}
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};

export default LoginForm;
