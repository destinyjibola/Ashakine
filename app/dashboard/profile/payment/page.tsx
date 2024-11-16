"use client";
import { SettingsSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      accountnumber: undefined,
      bank: undefined,
      nameonbank: undefined,
    },
  });

  const onSubmit: any = (values: z.infer<typeof SettingsSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Contact info
          </h4>
          {/* contact info */}

          <FormField
            control={form.control}
            name="accountnumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="account number"
                    disabled={isPending}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameonbank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name on bank</FormLabel>
                <div className="flex space-x-4">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="JohnDoe@gmail.com"
                      disabled={isPending}
                      type="email"
                      // className="w-[80%]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="bank name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* contact info */}
          {/* 
          <FormError message={error} />
          <FormSuccess message={success} /> */}
          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Update"}
            {isPending && <div className="lds-hourglass ms-3"></div>}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PaymentPage;
