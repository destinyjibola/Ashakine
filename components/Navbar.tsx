"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-primarycolor/95 backdrop-blur-md border-b border-secondarycolor/15 fixed top-0 z-50">
      {/* Animated glow bar */}
      <div className="h-0.5 bg-gradient-to-r from-secondarycolor/0 via-secondarycolor to-secondarycolor/0 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Your preferred logo implementation */}
          <Link href="" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-4 border-secondarycolor/80 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                <div className="w-5 h-5 rounded-full bg-secondarycolor/20 border border-secondarycolor/50"></div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondarycolor shadow-[0_0_8px_#FFB347]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">Asherkine</span>
              <span className="text-xs text-secondarycolor font-mono tracking-widest mt-0.5">
                SPIN TO WIN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Prizes', 'How It Works', 'Contact'].map((item) => (
              <button
                key={item}
                className="relative text-white/90 hover:text-white font-medium text-sm uppercase tracking-wider group transition-colors duration-200"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-secondarycolor transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
              </button>
            ))}
            <button className="px-5 py-2 bg-secondarycolor rounded-full text-primarycolor font-bold hover:bg-secondarycolor/90 transition-colors shadow-lg hover:shadow-secondarycolor/30">
              Play Now
            </button>
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
          {['About', 'Prizes', 'How It Works', 'Contact'].map((item) => (
            <button
              key={item}
              className="block w-full text-left text-white py-2.5 px-3 rounded-md hover:bg-secondarycolor/10 hover:text-secondarycolor transition-colors uppercase text-sm tracking-wider"
            >
              {item}
            </button>
          ))}
          <button className="w-full mt-2 py-2.5 bg-secondarycolor text-primarycolor font-bold rounded-md">
            Play Now
          </button>
        </div>
      )}
    </nav>
  );
}