"use client";

import Hero from "@/components/Hero";
// Import Montserrat font
import { Montserrat } from "next/font/google";
import Image from "next/image";
import tomi from "../assets/images/tomi.svg";
import { Button } from "@/components/ui/button";
import GetInTouch from "@/components/GetInTouch";

// Initialize Montserrat with desired settings
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"], // Adjust weights as needed
});

const Page = () => {
  return (
    <main className={montserrat.className}>
      <Hero />

      <div className="container-spacing py-[7rem]">
        <h2 className="primaryheading text-primary-green-200 text-center mb-10">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:gap-0 gap-16 md:grid-cols-2">
          <Image
            height={600}
            width={500}
            alt="Uxr insider tomi picture"
            src={tomi.src}
          />

          <div>
            <h2 className="smallheading">Meet Tomi</h2>
            <p className="paragraph-2 mt-4 italic">
              Hello! May i introduce myself...{" "}
            </p>
            <p className="paragraph-3 text-justify mt-4">
              My name is Tomi, and i am a User Researcher I have 10 years
              experience conducting research. I am passionate about good
              research and i had like to share my knowledge of UX research with
              you
              <br /> In UXR Insider, You will be empowered to
            </p>{" "}
            <br />
            <ol className="list-decimal paragraph-3 pl-5">
              <li>Do better research</li>
              <li>Ability to craft good research</li>
            </ol>
            <Button
              variant="outline"
              className="mt-6 py-6 text-lg font-medium px-8 broder border-primary-green-300 hover:bg-primary-green-400 transition"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>


      <GetInTouch/>

    </main>
  );
};

export default Page;
