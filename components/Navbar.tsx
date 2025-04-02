"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { title: "Services", id: "services" },
    { title: "Process", id: "process" },
    { title: "Testimonials", id: "testimonials" },
    { title: "Contact us", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial render

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="w-full bg-navy-900/90 backdrop-blur-md border-b border-gold-500/10 fixed top-0 z-50 py-2">
      {/* Subtle gold glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Luxury Logo Mark */}
          <Link
            href="/"
            className="flex items-center group"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("");
            }}
          >
            <div className="flex items-center space-x-3">
              {/* Monogram Badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                  <span className="font-serif text-xl text-navy-900 font-bold">
                    VC
                  </span>
                </div>
                {/* Gold accent dot */}
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-gold-400"></div>
              </div>

              {/* Wordmark with perfect vertical alignment */}
              <div className="flex flex-col justify-center">
                <div className="flex items-end">
                  <span className="font-serif text-2xl font-bold text-white leading-tight">
                    VA
                  </span>
                  <span className="font-serif text-2xl font-bold text-white leading-tight">
                    Concierge
                  </span>
                </div>
                <div className="h-[1px] w-full bg-gold-500/30 mt-1"></div>
                <span className="text-[0.65rem] text-gold-400 tracking-[0.2em] mt-1">
                  LUXURY SERVICES
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-sans text-platinum hover:text-gold-400 transition-colors
                  ${
                    activeSection === item.id ? "text-gold-500 font-medium" : ""
                  }`}
              >
                {item.title}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gold-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-800/95 backdrop-blur-lg px-4 pb-4">
          <div className="pt-2 pb-3 space-y-1">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md font-medium font-sans
                  ${
                    activeSection === item.id
                      ? "bg-navy-700 text-gold-500"
                      : "text-platinum hover:bg-navy-700 hover:text-gold-400"
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
