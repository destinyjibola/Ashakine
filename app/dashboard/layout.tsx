import React from "react";


import TopNav from "@/components/dashboard/TopNav";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Sidebar from "@/components/dashboard/Sidebar";
import Heading from "@/components/dashboard/Heading";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="flex flex-col">
        <TopNav />
        {/* <DashboardContent /> */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-200">
         <Heading/>

          <div className="" x-chunk="dashboard-02-chunk-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default layout;
