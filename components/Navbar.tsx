"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import UserButtonHome from "./auth/UserButtonHome";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userCookie, setUserCookie] = useState<string | undefined>();

  useEffect(() => {
    const cookie = Cookies.get("user");
    setUserCookie(cookie);
  }, []);

  const menus = [
    { title: "Discovery", path: "/" },
    { title: "About", path: "/about" },
    { title: "Help", path: "/help" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      role="navigation"
      className="w-full items-center bg-white border-b shadow-lg lg:border fixed top-0 z-50"
    >
      <div className="items-center justify-between mx-auto lg:flex px-4 lg:px-[12rem]">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center justify-between py-[0.8rem] lg:block">
          <Link href="/" className="flex items-center space-x-2">
            <h2 className="text-[28px]">Crowdfund+</h2>
          </Link>

          <div className="lg:hidden flex items-center space-x-2">
            {userCookie ? (
              <UserButtonHome />
            ) : (
              <Link href="/auth/register" className="lg:block hidden mb-4">
                <Button className="rounded-[24px] mt-4 p-[25px] text-base bg-primary-color">
                  Sign In
                </Button>
              </Link>
            )}
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X width={45} height={45} />
              ) : (
                <Menu width={45} height={45} />
              )}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className={`flex space-x-4 lg:flex lg:space-x-4 lg-pb-0 pb-4 lg:items-center ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6 lg:flex">
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
            <li className="lg:block hidden">
              {userCookie ? (
                <UserButtonHome />
              ) : (
                <Link href="/auth/login" className="lg:block hidden mb-4">
                  <Button className="rounded-[24px] mt-4 p-[25px] text-base bg-primary-color">
                    Sign In
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
