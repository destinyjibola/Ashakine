import React from "react";
import Navbar from "./_components/Navbar";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-[100h] w-full flex flex-col gap-y-4 items-center justify-center bg-sky-500">
    <Navbar/>
      {children}
    </div>
  );
};

export default layout;
