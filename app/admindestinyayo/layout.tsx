'use client'; // Required for interactivity

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Navigation items
  const navItems = [
    { href: '/admindestinyayo', label: 'Dashboard' },
    { href: '/admindestinyayo/events', label: 'Events' },
    { href: '/admindestinyayo/prizes', label: 'Prizes' },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transform transition-transform duration-200 ease-in-out
          fixed md:static w-64 h-full bg-gray-800 z-20 md:z-0`}
        style={{ top: isMobile ? '56px' : '0' }}
      >
        <div className="p-4 h-full flex flex-col">
          <h1 className="text-2xl font-bold hidden md:block mb-8">Admin Panel</h1>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      pathname === item.href
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}