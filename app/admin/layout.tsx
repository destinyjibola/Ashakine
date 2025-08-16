"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { useAuth } from "@/hooks/AuthContext";
import Spinly from "../../assets/icons/spinly.svg";
import Image from "next/image";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        logout();
        setIsUserDropdownOpen(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { href: "/admin", label: "Home" },
    { href: "/admin/events", label: "My Spinwheels" },
  ];

  return (
    <div className="flex flex-col bg-white container-spacing">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 py-6 h-[100px] container-spacing  bg-[#FFB600] border-b border-[#e6af2230]">
        <div className="px-4 flex justify-between items-center ">
          <Link href="/admin" className="hidden lg:flex items-center gap-3">
            {/* <Image width={154} height={32} alt="spinly logo" src={Spinly.src} /> */}
            <h2 className="text-3xl font-bold">Spinly</h2>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex bg-white p-3 rounded-[27px] absolute left-1/2 transform -translate-x-1/2 shadow-sm">
            <div className="flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-[27px] text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-[#FFB600] to-[#FF9400] text-white"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Dropdown */}
          {user && (
            <div className="relative ml-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleUserDropdown}
                  className="w-10 h-10 rounded-full text-black font-extrabold bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                >
                  {user.name?.[0]?.toUpperCase() ?? ""}
                </button>
                <FiChevronDown
                  className={`transition-transform text-gray-600 ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20 bg-white border border-gray-200">
                  <Link
                    href="/admin/profile"
                    className="px-4 py-2.5 text-gray-700 hover:bg-[#FFB60014] hover:text-orange-600 flex items-center gap-2 transition-colors"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <FiUser size={16} className="text-[#FF9400]" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-[#FFB60014] hover:text-orange-600 flex items-center gap-2 transition-colors"
                  >
                    <FiLogOut size={16} className="text-[#FF9400]" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <div className="md:hidden fixed top-[100px] left-0 right-0 z-[1000px] bg-white border-t border-[#FFB60030]">
          <div className="flex flex-col p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-[#FFB600] to-[#FF9400] text-white"
                    : "text-gray-700 hover:bg-[#FFB60014] hover:text-orange-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {/* <main className="flex-1 pt-[50px] sm:pt-[150px] overflow-hidden"> */}
      <main className="flex-1 pt-[6rem] pb-[6rem] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
