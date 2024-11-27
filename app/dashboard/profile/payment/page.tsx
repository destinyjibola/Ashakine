"use client";
import { SettingsSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState, useTransition } from "react";
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
import { fetchUserData } from "@/lib/fetchUser";
import Cookies from "js-cookie";
import axios from "axios";


const PaymentPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = Cookies.get("user");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      accountNumber: undefined,
      bank: undefined,
      bankName: undefined,
    },
  });

  useEffect(() => {
    // Specify the desired endpoint and fields to inject
    fetchUserData(
      setData,
      form,
      ["accountNumber", "bank", "bankName"],
      "getSingleUser"
    );
  }, [form]);

  const onSubmit: any = async (values: z.infer<typeof SettingsSchema>) => {
    const data = { _id: user, ...values};
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/updateProfile`,
        data
      );

      if (res.status === 200) {
        setLoading(false);
        alert("profile updated successfully");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Bank details
          </h4>
          {/* contact info */}

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="account number"
                    disabled={loading}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account name</FormLabel>
                <div className="flex space-x-4">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="account number"
                      disabled={loading}
                      type="text"
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
                    disabled={loading}
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
          <Button disabled={loading} type="submit">
            {loading ? "Updating..." : "Update"}
            {loading && <div className="lds-hourglass ms-3"></div>}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PaymentPage;
