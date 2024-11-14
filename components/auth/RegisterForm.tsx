"use client";
import { RegisterSchema } from "@/schemas/route";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import heroimage from "../../assets/crowdfund/hero-image.svg";
import "react-toastify/dist/ReactToastify.css";
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
// import { register } from "@/actions/register";
const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    console.log(values)

    // startTransition(() => {
    //   register(values).then((data: any) => {
    //     setError(data?.error);
    //     setSuccess(data?.success);
    //     toast.info(data?.error,{
    //       theme: "light",
    //     });
    //     toast.info(data?.success,{
    //       theme: "light",
    //     });
    //   });
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-[1.3rem]"
                        disabled={isPending}
                        placeholder="john doe"
                        {...field}
                        type="name"
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full rounded-[12px]  py-[1.3rem] bg-primary-color paragraph-7"
            >
              {isPending ? "Registering" : "Register"}{" "}
              {isPending && <div className="lds-hourglass ms-3"></div>}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};

export default RegisterForm;
