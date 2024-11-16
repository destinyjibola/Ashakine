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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// import { useForm } from 'react-hook-form';

const Homepage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [banner, setBanner] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: undefined,
      phonenubmer: undefined,
      address: undefined,
      image: undefined,
    },
  });


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

          <FormItem>
            <FormLabel>Proifle picture</FormLabel>
            <FormControl>
              <Input
                type="file"
                onChange={async (e) => handleFileChange(e, setBanner)}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                  />
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
            name="phonenubmer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="phone number"
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="Adress here..."
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

export default Homepage;
