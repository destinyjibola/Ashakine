"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Cookies from "js-cookie"; // Import js-cookie

const UserButton = () => {
  const handleLogout = () => {
    Cookies.remove("user"); // Clear the 'user' cookie
    // Optional: Redirect to login or home page
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1">
        <Avatar>
          {/* <AvatarImage src={user?.image || ""} alt="@shadcn" /> */}
          <AvatarFallback className="bg-primary-color-150 text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
        <IoIosArrowDropdownCircle className="h-5 w-5 text-primary-color-150" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard/profile" className="flex items-center">
            <FaUser className="h-4 w-4 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <div className="flex items-center">
            <ExitIcon className="h-4 w-4 mr-2" />
            LogOut
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
