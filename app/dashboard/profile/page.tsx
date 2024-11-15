"use client";
// import { settings } from "@/actions/settings";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
// import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const switchSchema = z.object({
  toggle: z.boolean().default(false),
  phonetoggle: z.boolean().default(false),
});

const Homepage = () => {
  // const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [successEmail, setSuccessEmail] = useState<string | undefined>();
  const [errorEmail, setErrorEmail] = useState<string | undefined>();
  const [successPhone, setSuccessPhone] = useState<string | undefined>();
  const [errorPhone, setErrorPhone] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();
  const [isPendingEmail, startTransitionEmail] = useTransition();
  const [isPendingPhone, startTransitionPhone] = useTransition();

  const [isPasswordChangeEnabled, setIsPasswordChangeEnabled] = useState(false);
  const [phoneToggle, setPhoneToggle] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [phoneEdited, setPhoneEdited] = useState(false);

  const handleEmailChange = () => {
    setEmailEdited(true);
  };

  const handlePhoneChange = () => {
    setPhoneEdited(true);
  };
  const { update } = useSession();

  const switchform = useForm<z.infer<typeof switchSchema>>({
    resolver: zodResolver(switchSchema),
    defaultValues: {
      toggle: false,
      phonetoggle: false,
    },
  });

  // const form: any = useForm<z.infer<typeof SettingsSchema>>({
  //   resolver: zodResolver(SettingsSchema),
  //   defaultValues: {
  //     name: user.name || undefined,
  //     username: user.username || undefined,
  //     address: user.address || undefined,
  //   },
  // });

  // const emailform: any = useForm<z.infer<typeof SettingsSchema>>({
  //   resolver: zodResolver(SettingsSchema),
  //   defaultValues: {
  //     email: user.email || undefined,
  //   },
  // });

  // const phonenumberform: any = useForm<z.infer<typeof SettingsSchema>>({
  //   resolver: zodResolver(SettingsSchema),
  //   defaultValues: {
  //     phonenumber: user.phonenumber || undefined,
  //   },
  // });

  const onSubmit: any = (values: z.infer<typeof SettingsSchema>) => {
    // startTransition(() => {
    //   settings(values, "Contact")
    //     .then((data) => {
    //       if (data.error) {
    //         setError(data.error);
    //       }

    //       if (data.success) {
    //         update();
    //         setSuccess(data.success);
    //       }
    //     })
    //     .catch(() => {
    //       setError("Something went wrong");
    //     });
    // });
  };

  const onSubmitEmail: any = (values: z.infer<typeof SettingsSchema>) => {
    // startTransitionEmail(() => {
    //   settings(values, "Email")
    //     .then((data) => {
    //       if (data.error) {
    //         setErrorEmail(data.error);
    //       }

    //       if (data.success) {
    //         update();
    //         setSuccessEmail(data.success);
    //       }
    //     })
    //     .catch(() => {
    //       setErrorEmail("Something went wrong");
    //     });
    // });

  };

  const onSubmitPhone: any = (values: z.infer<typeof SettingsSchema>) => {
    // startTransitionPhone(() => {
    //   settings(values, "Contact")
    //     .then((data) => {
    //       if (data.error) {
    //         setErrorPhone(data.error);
    //       }

    //       if (data.success) {
    //         update();
    //         setSuccessPhone(data.success);
    //       }
    //     })
    //     .catch(() => {
    //       setErrorPhone("Something went wrong");
    //     });
    // });
    console.log(values)
  };

  return (
    <>
     
    </>
  );
};

export default Homepage;
