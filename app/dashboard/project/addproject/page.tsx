"use client";
import { LoginSchema, ProjectSchema } from "@/schemas/route";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardWrapper from "@/components/auth/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Image from "next/image";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [date, setDate] = useState<Date>();
  const [images, setImages] = useState<string[]>([]); // State to hold multiple image data URLs

  const user = Cookies.get("user");

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      budgetDetails: "",
      categoryId: "",
      shortdesc: "",
      goalAmount: undefined
    },
  });

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    const startdate = new Date();
    const data = { userId: user, ...values, startdate, enddate: date, images };
    console.log(data);

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/addProject`,
        data
      );

      if (res.status === 200) {
        setLoading(false);
        alert("profile updated successfully");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response);
    }
  };

  // Function to read files as data URLs
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

  // Function to handle file change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const imagePromises = Array.from(selectedFiles).map((file) =>
        readFileAsDataURL(file)
      );
      const newImages = await Promise.all(imagePromises);
      setImages((prevImages) => [...prevImages, ...newImages]);
      e.target.value = ""; // Clear the input
    }
  };

  // Function to handle deleting an image
  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <div className="bg-white max-w-full p-8">
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="title..."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortdesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={loading}
                          placeholder="Write short description here..."
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
                          placeholder="extensive description here..."
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
                          type="number"
                          {...field}
                          placeholder="amount..."
                          disabled={loading}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          } // Convert value to number
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

                {/* <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="product image"
                      disabled={loading}
                      accept="image/*"
                      multiple
                      onChange={handleInputFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <div className="flex">
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <Photocard
                        onDelete={(e) => {
                          e.preventDefault();
                          handleDeleteFile(index);
                        }}
                        key={index}
                        url={URL.createObjectURL(file)}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </div> */}

              
              </div>

              <div className="flex flex-col space-y-4">


              <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
                          <SelectItem value="674f94d3f79a8218f336fa35">
                            Community
                          </SelectItem>
                          <SelectItem value="674f94e8f79a8218f336fa38">
                            Faith Based
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="flex flex-col space-y-4">
                  <FormLabel>Dead line</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <FormItem>
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      disabled={loading}
                      multiple
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <div className="flex flex-wrap mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative m-2">
                      <Image
                        src={image}
                        alt={`Image ${index}`}
                        width={120}
                        height={60}
                        className="flex-1 w-[9rem] h-[5rem] object-cover"
                        unoptimized // This disables Next.js' optimization for base64 images
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button disabled={loading} type="submit" className="mt-8">
              {loading ? "Updating..." : "Update"}
              {loading && <div className="lds-hourglass ms-3"></div>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
