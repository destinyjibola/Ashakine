"use client";

import React, { useState } from "react";
import Link from "next/link";
import Spinly from "../assets/icons/spinly.svg";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FFB600] border-b border-[#e6af2230] backdrop-blur-md sticky top-0 z-50">
      {/* Animated glow bar */}
      <div className="h-0.5 bg-gradient-to-r from-secondarycolor/0 via-secondarycolor to-secondarycolor/0 animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - visible on all screens */}
          <Link href="/" className="flex items-center gap-3">
            {/* <Image
              width={120}
              height={25}
              alt="Spinly logo"
              src={Spinly.src}
              className="w-auto h-6 md:h-8"
              priority
            /> */}
            <h2 className="text-3xl font-bold">Spinlly</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href={user ? "/admin" : "/auth/register"}>
              <button className="py-2 px-5 md:py-3 md:px-6 bg-gradient-to-r from-gray-200 to-white text-primarycolor rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-secondarycolor/30 text-sm md:text-base">
                {user ? "Go to dashboard" : "Get started"}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#FFB600CC] backdrop-blur-lg overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-3 border-t border-secondarycolor/10">
          <Link href={user ? "/admin" : "/auth/register"} onClick={() => setMenuOpen(false)}>
            <button className="w-full py-3 bg-white text-[#FF9400] font-bold rounded-md hover:bg-gray-50 transition-colors">
              {user ? "Go to dashboard" : "Get started"}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}