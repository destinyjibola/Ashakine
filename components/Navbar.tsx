"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from '../assets/images/logo.svg'

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const menus = [
    { title: "About me", path: "/" },
    { title: "Testimonial", path: "/" },
    { title: "Blog", path: "/" },
    { title: "Contact", path: "/" },
    { title: "Shop", path: "/" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);  
  };

  return (
    <nav
      role="navigation"
      className="w-full items-center bg-white border-b py-4 lg:py-6 shadow-lg lg:border fixed top-0 z-50"
    >
      <div className="items-center justify-between mx-auto lg:flex px-4 lg:px-[12rem]">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center justify-between py-[0.8rem] lg:block">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo.src} height={100} width={200} alt="uxrinsider logo"  />
          </Link>

          <div className="lg:hidden flex items-center space-x-2">
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
          className={`flex space-x-4 lg:flex lg:space-x-4 lg:items-center ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="justify-center items-center md:space-y-0 space-y-2 lg:space-x-6 lg:flex">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className={`text-custom-gray hover:text-primary-green-50 transition text-lg`}
              >
                <Link href={item.path} onClick={handleLinkClick}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
