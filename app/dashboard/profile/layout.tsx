"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ProtectedLayoutProps) => {
  let pathname = usePathname();
  pathname = pathname.startsWith("/") ? pathname.substring(1) : pathname;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const parts = pathname.split("/").filter((segment) => segment !== "");

  const path = parts.length > 0 ? parts[parts.length - 1] : "";

  return (

      <Tabs
        defaultValue={path === "profile" ? "contact" : path}
        className=" items-start flex-col flex space-y-6"
      >
        <TabsList className="bg-gray-700 justify-around flex-row sm:w-auto w-auto px-6 py-6">
          <Link href="/dashboard/profile">
            <TabsTrigger value="contact" className="text-base text-white">
              Contact
            </TabsTrigger>
          </Link>
          <Link href="/dashboard/profile/business">
            <TabsTrigger
              value="business"
              onClick={() => {}}
              className="text-base text-white"
            >
              Business info
            </TabsTrigger>
          </Link>
          <Link href="/dashboard/profile/links">
            <TabsTrigger value="links" className="text-base text-white">
              Links
            </TabsTrigger>
          </Link>
          <Link href="/dashboard/profile/security">
            <TabsTrigger value="security" className="text-base text-white">
              Security
            </TabsTrigger>
          </Link>
        </TabsList>

        <Card className="w-[600px]">
          <CardContent>{children}</CardContent>
        </Card>
      </Tabs>

  );
};

export default Layout;
