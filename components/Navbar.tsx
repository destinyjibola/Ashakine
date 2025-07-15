"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spinly from "../assets/icons/spinly.svg";

import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FFB60014] border-b border-[#FFB60030] backdrop-blur-md  container-spacing">
      {/* Animated glow bar */}
      <div className="h-0.5 bg-gradient-to-r from-secondarycolor/0 via-secondarycolor to-secondarycolor/0 animate-pulse"></div>

      <div className="">
        <div className="flex justify-between items-center h-[6rem]">
          {/* Your preferred logo implementation */}
          <Link href="" className="hidden lg:flex items-center gap-3">
            <Image width={154} height={32} alt="spinly logo" src={Spinly.src} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/auth/register">
              <button className="py-3 px-6 bg-gradient-to-r from-[#FFB600] to-[#FF9400] text-white rounded-full font-bold hover:bg-secondarycolor/90 transition-colors shadow-lg hover:shadow-secondarycolor/30">
                Get started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondarycolor p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-primarycolor/95 backdrop-blur-lg px-4 py-3 space-y-3 border-t border-secondarycolor/10">
          <Link href="/auth/register">
            <button className="w-full mt-2 py-3 px-6 bg-secondarycolor text-primarycolor font-bold rounded-md">
              Get started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
