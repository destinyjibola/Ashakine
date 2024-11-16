"use client";

import { useRouter, usePathname } from "next/navigation"; // Import Next.js navigation hooks
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button component
import { CardContent } from "@/components/ui/card";

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
    // { label: "Security", path: "/dashboard/profile/security" },
  ];

  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex whitespace-nowrap mb-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <Button
            key={tab.path}
      
            onClick={() => router.push(tab.path)}
            className={`px-4 py-2 mx-1 text-sm ${
              currentPath === tab.path
                ? "border-b-2 border-primary"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 bg-white text-black"
            } transition-colors`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* T Content */}
      <div className="bg-white md:w-[600px] max-w-full">
       <CardContent>{children}</CardContent>
      </div>
    </div>
  );
};

export default Layout;
