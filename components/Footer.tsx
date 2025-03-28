import Image from "next/image";
import React from "react";
import instagram from "../assets/icons/skill-icons_instagram.svg";
import thread from "../assets/icons/bi_threads-fill.svg";
import tiktok from "../assets/icons/logos_tiktok-icon.svg";
import linkedin from "../assets/icons/linkedin.svg";
import logo from "../assets/images/whitelogo.svg";
import gmail from "../assets/icons/gmail.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="container-spacing"></div>
      <footer
        role="contentinfo"
        className="bg-primary-green-100 container-spacing "
      >
        <div className="py-[5rem] text-white grid grid-cols-1 lg:gap-0 gap-10 lg:grid-cols-2">
          <div className="flex flex-row">
            <div className="w-full lg:basis-[70%]">
              <Image
                width={170}
                height={100}
                src={logo.src}
                alt="uxr insider logo"
              />
              <p className="leading-7 flex items-center text-lg [&:not(:first-child)]:mt-4">
                <Image
                  width={20}
                  height={20}
                  src={gmail.src}
                  className="mr-2"
                  alt="uxr insider gmail"
                />
                tomi@uxinsider.com
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3  lg:gap-6 gap-10 ">
            <div>
              <p className="text-lg font-semi-bold">Quick Links</p>

              <div className="mt-2 text-base">
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">About us</p>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">Testimonial</p>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">Contact</p>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">Blog</p>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <p className="leading-8">Shop</p>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <div>
                <p className="text-lg font-semi-bold">Legal Links</p>

                <div className="mt-2 text-base">
                  <p className="leading-8">Privacy Policy</p>
                  <p className="leading-8">Terms and Conditions</p>
                  <p className="leading-8">Complaint Policy</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <div>
                <p className="text-lg font-semi-bold">Socials</p>

                <div className="mt-2 text-base">
                  <p className="leading-8">
                    Follow us on all our social media platform
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Image
                      width={20}
                      height={20}
                      src={instagram.src}
                      alt="uxr insider logo"
                    />

                    <Image
                    width={20}
                    height={20}
                      src={thread.src}
                      alt="uxr insider logo"
                    />

                    <Image
                        width={20}
                        height={20}
                      src={tiktok.src}
                      alt="uxr insider logo"
                    />

                    <Image
                       width={20}
                       height={20}
                      src={linkedin.src}
                      alt="uxr insider logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="border-white" />
        <div className="justify-between text-sm space-y-3 items-center lg:flex-row flex-col flex py-[2rem]">
          <div className="text-white">@2024 Crowdfund+ All Rights Reserved</div>

          <div className="text-white">Created by JibolaDestiny</div>
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
