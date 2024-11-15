"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import Next.js navigation hooks
import { Button } from "@/components/ui/button";


interface Tab {
  label: string;
  path: string; // Path for navigation
}



interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ProtectedLayoutProps) => {
  const tabs: Tab[] = [
    { label: "Contacts", path: "/dashboard/profile" },
    { label: "Verification", path: "/dashboard/profile/verification" },
    { label: "Payment", path: "/dashboard/profile/payment" },
    { label: "Security", path: "/dashboard/profile/security" },
  ];

  const router = useRouter();
  const currentPath = usePathname();



  let pathname = usePathname();
  pathname = pathname.startsWith("/") ? pathname.substring(1) : pathname;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const parts = pathname.split("/").filter((segment) => segment !== "");

  const path = parts.length > 0 ? parts[parts.length - 1] : "";

  return (
    // <Tabs
    //   defaultValue={path === "profile" ? "contact" : path}
    //   className=" items-start flex-col flex space-y-6 overflow-x-scroll"
    // >
    //   <TabsList className="bg-gray-700 justify-around flex-row sm:w-auto w-auto px-6 py-6">
    //     <Link href="/dashboard/profile">
    //       <TabsTrigger value="contact" className="text-base text-white">
    //         Contact
    //       </TabsTrigger>
    //     </Link>

    //     <Link href="/dashboard/profile">
    //       <TabsTrigger value="contact" className="text-base text-white">
    //         Contact
    //       </TabsTrigger>
    //     </Link>

    //     <Link href="/dashboard/profile/business">
    //       <TabsTrigger
    //         value="business"
    //         onClick={() => {}}
    //         className="text-base text-white"
    //       >
    //         Verification
    //       </TabsTrigger>
    //     </Link>
    //     <Link href="/dashboard/profile/security">
    //       <TabsTrigger value="security" className="text-base text-white">
    //         Security
    //       </TabsTrigger>
    //     </Link>
    //   </TabsList>

    //   <Card className="w-[100%] bg-red-500 ">
    //     <CardContent>{children}</CardContent>
    //   </Card>
    // </Tabs>

    <div className="w-full overflow-x-auto">
    {/* Tab Buttons */}
    <div className="flex whitespace-nowrap mb-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <Button
          key={tab.path}
          variant={currentPath === tab.path ? "default" : "ghost"}
          onClick={() => router.push(tab.path)}
          className={`px-4 py-2 mx-1 text-sm ${
            currentPath === tab.path
              ? "border-b-2 border-primary text-primary"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          } transition-colors`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  </div>
  
  );
};

export default Layout;
