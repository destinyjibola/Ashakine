import { Button } from "./ui/button";
import heroimage from "../assets/images/heroimage.jpeg";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

export const SubscribeSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const Hero = () => {
  const form = useForm<z.infer<typeof SubscribeSchema>>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SubscribeSchema>) => {};

  return (
    <header
      style={{
        background: `linear-gradient(
          180deg,
          rgba(32, 56, 21, 0) -3.25%,
          #0A1505 47.34%
        ), url(${heroimage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
      id="hero-section"
      role="banner"
      className="flex items-center flex-col space-y-16 container-spacing mt-[6.5rem] py-[8rem]"
    >
      <div className="flex flex-col space-y-6 w-[100%] text-center relative z-10">
        <h2 className="topheading text-white w-full lg:w-[65%] md:w-[90%] mx-auto">
          Get My Free Guide: 10 Tips to Transition to UX Research
        </h2>
        <h2 className="smallheading text-custom-gray-50 w-full lg:w-[60%] md:w-[75%] mx-auto">
          Simply subscribe and download to get instant access
        </h2>
      </div>

      <Form {...form}>
      <form
  onSubmit={form.handleSubmit(onSubmit)}
  className="w-full max-w-[600px] flex flex-col md:flex-row gap-4" // Changed to column on mobile
>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem className="w-full"> {/* Full width on mobile */}
        <FormControl>
          <div className="relative flex items-center">
            <Input
              className="py-6 px-6 w-full text-base border border-primary-green rounded-[10px] focus-visible:ring-offset-0 focus-visible:ring-primary-color"
              placeholder="Enter your email address"
              {...field}
              type="email"
            />
          </div>
        </FormControl>
        <FormMessage className="absolute mt-1 text-white" />
      </FormItem>
    )}
  />
  <Button
    type="submit"
    className="py-6 w-full md:w-auto rounded-[10px] bg-primary-green-50 hover:bg-primary-green-50/90 text-base font-medium px-8"
  >
    Subscribe
  </Button>
</form>
      </Form>
    </header>
  );
};

export default Hero;
