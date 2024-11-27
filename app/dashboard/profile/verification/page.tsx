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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const VerificationPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [front, setFront] = useState<string | undefined>(undefined);
  const [back, setBack] = useState<string | undefined>(undefined);
  const [data, setData] = useState<any>();

  const user = Cookies.get("user");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      idNumber: undefined,
    },
  });

  useEffect(() => {
    fetchUserData(setData, form, ["idNumber"], "getSingleUser");
  }, [form]);

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const imageData = await readFileAsDataURL(selectedFile);
      setFile(imageData);
      e.target.value = "";
    } else {
      alert("Invalid file type. Please select an image");
      e.target.value = "";
    }
  };

  const onSubmit: any = async (values: z.infer<typeof SettingsSchema>) => {
    const data = { _id: user, ...values, idFront: front, idBack: back };

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
            Verification details
          </h4>
          {/* contact info */}

          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id card number</FormLabel>
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

          <FormItem>
            <FormLabel>Id card (Front)</FormLabel>
            {data && (
              <Image
                src={data.idFront}
                alt="image"
                width={120}
                height={60}
                className="flex-1 w-[9rem] h-[5rem] object-cover"
              />
            )}
            <FormControl>
              <Input
                type="file"
                onChange={async (e) => handleFileChange(e, setFront)}
                disabled={loading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Id Card (Back)</FormLabel>
            {data && (
              <Image
                src={data.idBack}
                alt="image"
                width={120}
                height={60}
                className="flex-1 w-[9rem] h-[5rem] object-cover"
              />
            )}

            <FormControl>
              <Input
                type="file"
                onChange={async (e) => handleFileChange(e, setBack)}
                disabled={loading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="flex flex-col items-start space-y-2">
            <FormLabel>Verification status</FormLabel>
            <Button className="" >Not verified</Button>
            </div>

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

export default VerificationPage;
