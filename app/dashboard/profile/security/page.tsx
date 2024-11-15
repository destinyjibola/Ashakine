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

const Links = () => {
  const user = useCurrentUser();
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [banner, setBanner] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isPasswordChangeEnabled, setIsPasswordChangeEnabled] = useState(false);

  const { update } = useSession();

  const switchform = useForm<z.infer<typeof switchSchema>>({
    resolver: zodResolver(switchSchema),
    defaultValues: {
      toggle: false,
    },
  });

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined,
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

  useEffect(() => {
    if (!isPasswordChangeEnabled) {
      form.setValue("password", undefined);
      form.setValue("newPassword", undefined);
    } else {
      form.setValue("password", "");
      form.setValue("newPassword", "");
    }
  }, [isPasswordChangeEnabled, form]);

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

    startTransition(() => {
      settings(values, "Security")
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
        {/* social media */}

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Security
        </h4>

        <FormField
          control={switchform.control}
          name="toggle"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Reset Password</FormLabel>
                <FormDescription>
                  Flip the switch to reset password
                </FormDescription>

                <FormControl>
                  <Switch
                    checked={isPasswordChangeEnabled}
                    onCheckedChange={setIsPasswordChangeEnabled}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="*******"
                  disabled={isPending || !isPasswordChangeEnabled}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="*******"
                  disabled={isPending || !isPasswordChangeEnabled}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  {" "}
                  Enable two factor authenticaton for your account
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        {/* social media */}

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

export default Links;
