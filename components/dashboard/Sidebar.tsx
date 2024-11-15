"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="secondaryheading-3">Crowdfund+</span>
          </Link>
        
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded px-3 py-2 transition-all paragraph-9 ${
                pathname === "/dashboard"
                    ? "bg-[#A937A9] text-white"
                  : "text-primary"
              }`}
            >
              <MdWindow className="h-6 w-6" />
             Overview
            </Link>
            <Link
              href="/dashboard/project"
              className={`flex items-center gap-3 rounded px-3 py-2 transition-all paragraph-9 ${
                pathname === "/dashboard/project"
                      ? "bg-[#A937A9] text-white"
                  : "text-primary"
              }`}
            >
              <HiOutlineSpeakerphone className="h-6 w-6" />
              Project
       
            </Link>

            <Link
              href="/dashboard/contribution"
              className={`flex items-center gap-3 rounded px-3 py-2.5 transition-all paragraph-9 ${
                pathname === "/dashboard/contribution"
                  ? "bg-[#A937A9] text-white"
                  : "text-primary"
              }`}
            >

              <FaHandHoldingHeart className="h-6 w-6" />
              Contribution
            </Link>
    
          </nav>
        </div>

      
      </div>
    </div>
  );
};

export default Sidebar;
