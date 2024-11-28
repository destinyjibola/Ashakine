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


type Params = {
  params: {
    donationId: string
  }
}

const page = async ({ params: { donationId } }: Params) => {
  const project = await getSingleProject(donationId)

  const percentageRaised = Math.min((project.currentAmount / project.goalAmount) * 100, 100);
  const formattedPercentage =
    percentageRaised % 1 === 0
      ? percentageRaised.toFixed(0)
      : percentageRaised.toFixed(2);
 
  const images = project.images.map((path, index) => ({
    src: path,
    alt: `Image ${index + 1}`, // Customize alt text as needed
  }));

  return (
    <>
      <Navbar />
      <section id="donation" className="container-spacing section-spacing ">
        <div className="grid grid-cols-2 pt-[1rem] gap-[4rem]">
          <div>
            <hr className="border-t-[5px] border-gray-300 mb-[1rem]" />

            <Slideshow images={images} />
          </div>
          <div>
            <hr className="border-t-[5px] border-gray-300 mb-[1rem]" />
            <h2 className="primaryheading-2">{project.title}</h2>

            <div className="flex items-start space-x-2 mt-[1rem]">
              <Image alt="avatar" width={50} height={50} src={avatar.src} />
              <div className="paragraph-1">
                <span>{project.userId.fullName}</span>
                <span className="flex items-center space-x-1">
                  <FaLocationDot />{" "}
                  <span className="text-custom-gray">{project.userId.country}</span>
                </span>
              </div>
            </div>

            <p className="paragraph-1 mt-[1rem]">
              {project.shortdesc}
            </p>

            <h2 className="mt-[1rem] primaryheading">${project.goalAmount}</h2>

            <Progress className="my-[1rem]" value={33} />

            <div className="flex justify-between paragraph-1">
              <p>${project.currentAmount} raised</p>
              <p>${formattedPercentage} completed</p>
            </div>

            <div className="flex flex-col mt-[1rem] items-center">
              <Button className="rounded-[12px] w-[85%] p-[25px] bg-primary-color paragraph-7">
                Donate
              </Button>
              <Button className="rounded-[12px] text-custom-gray-250 border border-[#808081] w-[85%] mt-2 p-[25px] bg-white paragraph-7">
                Share
              </Button>
            </div>
          </div>
        </div>

        <hr className="border-t-[3px] border-gray-300 mt-[4rem]" />

        <div className="grid grid-cols-2">
          <section>
            <div className="mt-[4rem]">
              <h2 className="paragraph-8 mb-[1rem]">About</h2>

              <p className="paragraph-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla onsequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minicitation ullamco st laborum.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minicitation ullamco
              </p>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
