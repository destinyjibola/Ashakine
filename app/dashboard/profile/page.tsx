"use client";
import { SettingsSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { fetchUserData } from "@/lib/fetchUser";

const Homepage = () => {
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any>();
  const [banner, setBanner] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = Cookies.get("user");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      fullName: data?.fullName || "",
      phoneNumber: data?.phoneNumber || "",
      homeAddress: data?.homeAddress || "",
      email: data?.email || "",
    },
  });

  useEffect(() => {
    // Specify the desired endpoint and fields to inject
    fetchUserData(
      setData,
      form,
      ["fullName", "email", "phoneNumber", "homeAddress"],
      "getSingleUser"
    );
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

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    const datas = { _id: user, ...values, image: banner };
    console.log(datas);
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/updateProfile`,
        datas
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
            Contact info
          </h4>
          <div>
            {data && (
              <Image
                src={data.image}
                alt="image"
                width={120}
                height={60}
                className="flex-1"
              />
            )}
          </div>
          <FormItem>
            <FormLabel>Change picture</FormLabel>
            <FormControl>
              <Input
                type="file"
                className="w-[50%]"
                onChange={(e) => handleFileChange(e, setBanner)}
                disabled={loading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex space-x-4">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="JohnDoe@gmail.com"
                      disabled={true}
                      type="email"
                      className="w-[80%]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="phone number"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Address here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button disabled={loading} type="submit">
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Homepage;
