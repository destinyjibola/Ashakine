"use client"
import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "../auth/UserButton";
import { MdWindow } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { usePathname } from "next/navigation";


const TopNav = () => {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-white">
          <nav className="grid gap-2 text-lg font-medium ">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* <Package2 className="h-6 w-6" /> */}
              <span className=" text-black">Crowdfund+</span>
            </Link>
         
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded px-3 py-2 transition-all paragraph-9 ${
                pathname === "/dashboard"
                  ? "bg-[#A937A9] text-white"
                  : "text-primary"
              }`}
            >
              <MdWindow className="h-6 w-6" />
              Overviews
            </Link>

            {/* <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 rounded px-3 py-2 transition-all paragraph-9 ${
                pathname === "/dashboard/profile"
                  ? "bg-[#A937A9] text-white"
                  : "text-primary"
              }`}
            >
              <IoMdContact className="h-6 w-6" />
              Profile
            </Link> */}

      
          </nav>
          {/* <div className="mt-auto">
             <span>Log out</span>
          </div> */}
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form className="invisible">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserButton />
    </header>
  );
};

export default TopNav;
