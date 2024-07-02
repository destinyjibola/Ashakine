"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogOut from "./LogOut";
import { ExitIcon } from "@radix-ui/react-icons";
const UserButton = () => {
  const user = useCurrentUser(); 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} alt="@shadcn" />
          <AvatarFallback className="bg-sky-500">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogOut>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            LogOut
          </DropdownMenuItem>
        </LogOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
