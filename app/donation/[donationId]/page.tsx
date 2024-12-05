import Slideshow from "@/components/Slideshow";
import React from "react";
import avatar from "../../../assets/icons/avatarimage.jpg";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getSingleProject from "@/helpers/getSingleProject";
import DonationSection from "@/components/DonationPage";

type Params = {
  params: {
    donationId: string;
  };
};

const page = async ({ params: { donationId } }: Params) => {
  const project = await getSingleProject(donationId);

  return (
    <>
      <Navbar />
      <DonationSection project={project} />

      <Footer />
    </>
  );
};

export default page;
