"use client";
import Slideshow from "@/components/Slideshow";
import React, { useState } from "react";
import avatar from "../assets/icons/avatarimage.jpg";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ProjectResponse } from "@/lib/types";
import Modal from "./Modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { BillingSchema, LoggedInBillingSchema } from "@/schemas/route";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import axios from "axios";
import Cookies from "js-cookie";
import Switch from "./Switch";


type ProjectProps = {
  project: ProjectResponse;
};

const DonationSection = ({ project }: ProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const user = Cookies.get("user");
  const { _id } = project;
  const loggedin = user !== undefined;
  // const loggedin = false;

  const form = useForm<z.infer<typeof BillingSchema>>({
    resolver: zodResolver(BillingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      amount: undefined,
    },
  });

  const loginform = useForm<z.infer<typeof LoggedInBillingSchema>>({
    resolver: zodResolver(LoggedInBillingSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const images = project.images.map((path, index) => ({
    src: path,
    alt: `Image ${index + 1}`, // Customize alt text as needed
  }));

  const percentageRaised = Math.min(
    (project.currentAmount / project.goalAmount) * 100,
    100
  );
  const formattedPercentage =
    percentageRaised % 1 === 0
      ? percentageRaised.toFixed(0)
      : percentageRaised.toFixed(2);
  // console.log(project)
  // console.log(percentageRaised)
  // console.log(formattedPercentage)
  const cleardatas = () => {};

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof BillingSchema>) => {
    const data = {
      ...values,
      anonymous: isChecked,
      projectId: _id,
      guest: !loggedin,
      ...(loggedin && { userId: user }),
    };

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/donation/initialize`,
        data
      );

      const { url } = res.data;

      if (res.status === 200) {
        setLoading(false);
        window.location.href = url;
        alert("Payment initialized");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const onSubmitLoggedIn = async (
    values: z.infer<typeof LoggedInBillingSchema>
  ) => {
    const data = {
      ...values,
      anonymous: isChecked,
      projectId: _id,
      guest: !loggedin,
    };

    console.table(data);
    // setLoading(true);
    // try {
    //   const res = await axios.post(
    //     `${process.env.NEXT_PUBLIC_APP_URL}/api/donation/initialize`,
    //     data
    //   );

    //   const { url } = res.data;

    //   if (res.status === 200) {
    //     setLoading(false);
    //     window.location.href = url;
    //     alert("Payment initialized");
    //   }
    // } catch (error: any) {
    //   setLoading(false);
    //   console.log(error.response);
    // }
  };

  return (
    <section id="donation" className="container-spacing section-spacing">
      {/* modal */}
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <div>
          {!loggedin && step == 1 && (
            <>
              <div className="text-sm text-gray-800 bg-[#fff9db] p-2 rounded">
                You are not logged in. Your details will still reflect on the
                donations list unless you choose to donate anonymously. Consider{" "}
                <span className="text-[#812c81] underline hover:font-semibold hover:text-purple-700 transition duration-200 cursor-pointer">
                  signing up
                </span>{" "}
                to monitor your donations and create future projects more
                easily.
              </div>

              <Button
                className="rounded-[12px] w-full p-[25px] bg-primary-color paragraph-7 mt-6"
                onClick={() => {
                  setStep(2);
                }}
              >
                Proceed
              </Button>
            </>
          )}

          {step == 2 && !loggedin && (
            <Form {...form}>
              <form
                className="space-y-6 py-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={loading}
                          type="text"
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
                            disabled={loading}
                            type="email"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=""
                          disabled={loading}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                  <div className="space-y-0.5 basis-8/12">
                    <FormLabel className="text-base">
                      Donate Anonymously
                    </FormLabel>
                    <FormDescription>
                      Your name and details will be hidden from the public
                      donations list when switched on.{" "}
                    </FormDescription>
                  </div>
                  <FormControl className="basis-4/12">
                    <Switch
                      checked={isChecked}
                      onChange={(value) => setIsChecked(value)}
                    />
                  </FormControl>
                </FormItem>

                <Button
                  className="rounded-[12px] w-full p-[22px] bg-primary-color paragraph-7 mt-6"
                  type="submit"
                >
                  {loading ? "Donating" : "Donates"}
                </Button>
              </form>
            </Form>
          )}

          {step == 2 && loggedin && (
            <Form {...loginform}>
              <form
                className="space-y-6 py-6"
                onSubmit={loginform.handleSubmit(onSubmitLoggedIn)}
              >
                <FormField
                  control={loginform.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=""
                          disabled={loading}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                  <div className="space-y-0.5 basis-8/12">
                    <FormLabel className="text-base">
                      Donate Anonymously
                    </FormLabel>
                    <FormDescription>
                      Your name and details will be hidden from the public
                      donations list when switched on.{" "}
                    </FormDescription>
                  </div>
                  <FormControl className="basis-4/12">
                    <Switch
                      checked={isChecked}
                      onChange={(value) => setIsChecked(value)}
                    />
                  </FormControl>
                </FormItem>

                <Button
                  className="rounded-[12px] w-full p-[22px] bg-primary-color paragraph-7 mt-6"
                  type="submit"
                >
                  {loading ? "Donating" : "Donates"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </Modal>
      {/* modal */}

      <div className="grid grid-cols-1 lg:grid-cols-2 pt-[1rem] gap-[4rem]">
        <div>
          <hr className="border-t-[5px] border-gray-300 mb-[1rem]" />
          <h2 className="primaryheading-2 lg:hidden block mb-6">
            {project.title}
          </h2>
          <Slideshow images={images} />
        </div>
        <div>
          <hr className="border-t-[5px] border-gray-300 mb-[1rem]" />
          <h2 className="primaryheading-2 lg:block hidden">{project.title}</h2>

          <div className="flex items-start space-x-2 mt-[1rem]">
            <Image
              alt="avatar"
              width={50}
              height={50}
              src={project.userId?.image || avatar.src} // Use user image or fallback avatar
            />
            <div className="paragraph-1">
              <span>{project.userId?.fullName || "Anonymous"}</span>
              <span className="flex items-center space-x-1">
                <FaLocationDot />
                <span className="text-custom-gray">
                  {project.userId?.country || "Unknown"}
                </span>
              </span>
            </div>
          </div>

          <p className="paragraph-1 mt-[1rem]">{project.shortdesc}</p>

          <h2 className="mt-[1rem] primaryheading">${project.goalAmount}</h2>

          <Progress className="my-[1rem]" value={+percentageRaised} />

          <div className="flex justify-between paragraph-1">
            <p>${project.currentAmount} raised</p>
            <p>{formattedPercentage}% completed</p>
          </div>

          <div className="flex flex-col mt-[1rem] items-center">
            <Button
              className="rounded-[12px] w-[85%] p-[25px] bg-primary-color paragraph-7"
              onClick={() => {
                setIsModalOpen(true);
                if (loggedin) {
                  setStep(2);
                } else {
                  setStep(1);
                }
              }}
            >
              Donate now
            </Button>
            <Button className="rounded-[12px] text-custom-gray-250 border hover:text-white border-[#808081] w-[85%] mt-2 p-[25px] bg-white paragraph-7">
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* <hr className="border-t-[3px] border-gray-300 mt-[4rem]" /> */}

      <div className="grid lg:grid-cols-2 grid-cols-1">
        <section>
          <div className="mt-[4rem]">
            <h2 className="paragraph-8 mb-[1rem]">About</h2>
            <p className="paragraph-1">{project.description}</p>
          </div>

          <div className="mt-[4rem]">
            <h2 className="paragraph-8 mb-[1rem]">Budget details</h2>
            <p className="paragraph-1">{project.budgetDetails}</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DonationSection;
