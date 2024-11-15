"use client";
import { settings } from "@/actions/settings";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
// import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const switchSchema = z.object({
  toggle: z.boolean().default(false),
});

const Business = () => {
  const user = useCurrentUser();
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [banner, setBanner] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { update } = useSession();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      businessname: user.businessname || undefined,
      logo: user.logo || undefined,
      banner: user.banner || undefined,
      category: user.category || undefined,
      description: user.description || undefined,
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
      e.target.value = ""; // Set the input value to an empty string
    } else {
      alert("Invalid file type. Please select an image");
      e.target.value = ""; // Set the input value to an empty string
    }
  };

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    const datas = { ...values, banner: banner, logo: logo };
    startTransition(() => {
      settings(datas, "Business")
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Business info
        </h4>

        <FormField
          control={form.control}
          name="businessname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select
                disabled={isPending}
                // onValueChange={field.onChange}
                // defaultValue={field.value}
                onValueChange={(value) => field.onChange(Number(value))} // Convert string to number on change
                defaultValue={
                  field.value !== undefined ? String(field.value) : undefined
                } // Convert number to string for defaultValue
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Real estate</SelectItem>

                  <SelectItem value="2">Book store</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isPending}
                  placeholder="Your business description..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Business Logo</FormLabel>
          <FormControl>
            <Input
              type="file"
              disabled={isPending}
              onChange={async (e) => handleFileChange(e, setLogo)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Banner</FormLabel>
          <FormControl>
            <Input
              type="file"
              onChange={async (e) => handleFileChange(e, setBanner)}
              disabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          {isPending ? "Updating...." : "Update"}
          {isPending && <div className="lds-hourglass ms-3"></div>}
        </Button>
      </form>
    </Form>
  );
};

export default Business;
