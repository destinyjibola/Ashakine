"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';
import UserButtonHome from "./auth/UserButtonHome";


export default function Navbar() {
  const pathname = usePathname();
  const [state, setState] = React.useState(false);
  const [userCookie, setUserCookie] = useState<string | undefined>();

  // Only set userCookie on the client-side after hydration
  React.useEffect(() => {
    const cookie = Cookies.get('user');
    setUserCookie(cookie);
  }, []);

  const menus = [
    { title: "Discovery", path: "/discovery" },
    { title: "About", path: "/about" },
    { title: "Help", path: "/help" },
  ];

  // Function to handle link click and close mobile menu
  const handleLinkClick = () => {
    setState(false);
  };

  return (
    <nav
      role="navigation"
      className="w-full items-center bg-white border-b shadow-lg lg:border fixed top-0 z-50"
    >
      <div className="items-center mx-auto lg:flex px-4 lg:px-[12rem]">
        <div className="flex items-center justify-between py-[0.8rem] lg:block">
          <Link href="/" className="flex items-center space-x-2">
            <h2 className="text-[28px]">Crowdfund+</h2>
          </Link>

          <div className="lg:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <X width={45} height={45} />
              ) : (
                <Menu width={45} height={45} />
              )}
            </button>
          </div>
        </div>

        <div
          className={`flex-1 justify-self-center lg:bg-white bg-gray-200 p-3 lg:block lg:pb-0 lg:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <div className="lg:hidden block">
            <Link
              href="https://wa.me/+2348062547433"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button className="rounded-[24px] mt-4 p-[25px] text-lg bg-primary-color">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex space-x-4">
          <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-4 lg:space-y-0">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className={`text-custom-gray hover:font-bold text-base ${
                  pathname === item.path ? "font-bold" : "font-medium"
                }`}
              >
                <Link href={item.path} onClick={handleLinkClick}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {userCookie ? (
            <UserButtonHome />
          ) : (
            <Link
              href="/auth/register"
              rel="noopener noreferrer"
              target="_blank"
              className="lg:block hidden mb-4"
            >
              <Button className="rounded-[24px] mt-4 p-[25px] text-base bg-primary-color">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
