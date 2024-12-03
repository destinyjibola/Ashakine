"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
// import { useCurrentUser } from "@/hooks/use-current-user";
import LogOut from "./LogOut";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
const UserButtonHome = () => {
  // const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src={user?.image || ""} alt="@shadcn" /> */}
          <AvatarFallback className="bg-primary-color-150 text-white"><FaUser /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex items-center">
          <FaUser className="h-4 w-4 mr-2" />
          Dashboard
          </Link>
   
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <LogOut>
            <div className="flex items-center">
              <ExitIcon className="h-4 w-4 mr-2" />
              LogOut
            </div>
          </LogOut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButtonHome;
