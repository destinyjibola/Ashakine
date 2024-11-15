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
      facebook: user.facebook || undefined,
      instagram: user.instagram || undefined,
      twitter: user.twitter || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values, "Links")
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
          Social account/External links
        </h4>

        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="facebook..."
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="instagram..."
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="twitter..."
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
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
