import Image from "next/image";
import React from "react";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/twitter.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="container-spacing"></div>
      <footer
        role="contentinfo"
        className="bg-primary-dark container-spacing section-spacing"
      >
        <div className="py-[3rem] text-white grid grid-cols-1 lg:gap-0 gap-10 lg:grid-cols-2">
          <div className="flex flex-row">
            <div className="w-full lg:basis-[70%]">
              <h3 className="scroll-m-20 text-[32px] font-normal tracking-tight">
                Crowdfund+
              </h3>
              <p className="leading-7 text-sm [&:not(:first-child)]:mt-2">
                Whether it is a personal need, community project, or faith-based
                initiative, we’re here to help you raise the support you
                deserve.
              </p>

              <div className="flex space-x-6 mt-4">
                <Image
                  className="cursor-pointer"
                  src={facebook.src}
                  width={20}
                  height={20}
                  alt="facebook"
                />
                <Image
                  className="cursor-pointer"
                  src={instagram.src}
                  width={20}
                  height={20}
                  alt="facebook"
                />

                <Image
                  className="cursor-pointer"
                  src={twitter.src}
                  width={20}
                  height={20}
                  alt="facebook"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-0 gap-10 ">
            <div>
              <p className="text-base font-semi-bold">Links</p>

              <div className="mt-2 text-sm">
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">Discovery</p>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">About</p>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">Help</p>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <div>
                <p className="text-base font-semi-bold">Contact</p>

                <div className="mt-2 text-sm">
                  <p className="leading-8">
                    <a
                      href="https://wa.me/+2349123928997"
                      target="_blank"
                      className="hover:underline"
                    >
                      +1(12345678)
                    </a>
                  </p>
                  <p className="leading-8">
                    <a
                      href="mailto:yemafolaofmatrix@gmail.com"
                      className="hover:underline"
                    >
                      example@gmail.com
                    </a>
                  </p>
                  <p className="leading-8">
                    456 Pineview Drive
                    Toronto, ON M5V 3L9
                    <br /> Canada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-white" />
        <div className="justify-between text-sm space-y-3 items-center lg:flex-row flex-col flex py-[2rem]">
          <div className="text-white">
            @2024 Crowdfund+ All Rights Reserved
          </div>

          <div className="text-white">
            Created by JibolaDestiny
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
