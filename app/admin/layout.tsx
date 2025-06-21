"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/hooks/AuthContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        logout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/prizes", label: "Prizes" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile header - Increased height */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center z-10 h-20">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        {/* Mobile user profile - Always visible on mobile */}
        {user && (
          <Link href="/admin/profile" className="flex items-center gap-2">
            {user.image && (
              <img 
                src={user.image} 
                alt={user.name || "User"} 
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="hidden sm:inline">{user.name || user.email}</span>
          </Link>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transform transition-transform duration-200 ease-in-out
          fixed md:static w-64 h-full bg-gray-800 z-20 md:z-0`}
        style={{ top: isMobile ? "80px" : "0" }}
      >
        <div className="p-4 h-full flex flex-col">
          <h1 className="text-2xl font-bold hidden md:block mb-8">
            Admin Panel
          </h1>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.label} 
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile and logout button - Visible in sidebar when open */}
          <div className="mt-auto pt-4 border-t border-gray-700">
            {user && (
              <div className="flex items-center gap-3 mb-4 px-4 py-2">
              
                <div>
                  <p className="font-medium">{user.name || user.email}</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto pt-20 md:pt-0">
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
}