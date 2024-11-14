import React from "react";
import { Button } from "./ui/button";

import heroimage from "../assets/crowdfund/hero-image.svg";

import Link from "next/link";

const Hero = () => {
  return (
    <header
      style={{
        backgroundImage: `url(${heroimage.src})`,
        backgroundSize: "cover",
        position: "relative", 
      }}
      id="hero-section"
      role="banner"
      className="flex items-center flex-col space-y-16 container-spacing py-[10rem]"
    >

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex flex-col space-y-6 w-[100%] text-center relative z-10">
        <h2 className="topheading text-white w-full lg:w-[90%] md:w-[90%] mx-auto">
        Let’s Build Something Extraordinary Together       </h2>
        <h2 className="secondaryheading text-white w-full lg:w-[47%] md:w-[75%] mx-auto">
        Whether it is a personal need, community project, or faith-based initiative, we’re here to help you raise the support you deserve.
        </h2>
        <Link
          href="https://wa.me/+2348062547433"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className="self-start mx-auto rounded-[40px] p-[27px] text-base bg-primary-color">
            Get Started
          </Button>
        </Link>

        <h2 className="paragraph-1 text-white w-full lg:w-[47%] md:w-[75%] mx-auto">
          For individuals, communities and charities no start up fees
        </h2>
      </div>
    </header>
  );
};

export default Hero;
