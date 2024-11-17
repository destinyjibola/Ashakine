"use client";
import React, { useState } from "react";
import { ProjectSchema, SettingsSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CreateProject = () => {

  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [banner, setBanner] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
      budgetDetails: undefined,
    },
  });

  const onSubmit: any = (values: z.infer<typeof SettingsSchema>) => {
    console.log(values);
  };
  return (
    <div className="">
      <div className="bg-white max-w-full p-8">
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Write description here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Budget details..."
                      />
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
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="123456789">Community</SelectItem>
                        <SelectItem value="123456780">Faith Based</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Budget details..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="amount need to be raised"
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
                name="enddate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Amount</FormLabel>
                    <FormControl>
                    
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={loading} type="submit">
              {loading ? "Updating..." : "Update"}
              {loading && <div className="lds-hourglass ms-3"></div>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProject;
