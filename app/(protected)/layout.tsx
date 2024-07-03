import React from "react";
import Navbar from "./_components/Navbar";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-gray-500">
    <div className="w-[600px] max-w-[100%] flex flex-col space-y-4 pb-10 mx-2">
    <Navbar/>
    {children}
    </div>
    </div>
  );
};

export default layout;
