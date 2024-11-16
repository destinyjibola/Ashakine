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

const VerificationPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [front, setFront] = useState<string | undefined>(undefined);
  const [back, setBack] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      idnumber: undefined,
      front: undefined,
      back: undefined,
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

          <FormField
            control={form.control}
            name="idnumber"
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

          <FormItem>
            <FormLabel>Id card (Front)</FormLabel>
            <FormControl>
              <Input
                type="file"
                onChange={async (e) => handleFileChange(e, setFront)}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>



          <FormItem>
            <FormLabel>Id Card (Back)</FormLabel>
            <FormControl>
              <Input
                type="file"
                onChange={async (e) => handleFileChange(e, setBack)}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

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

export default VerificationPage;
