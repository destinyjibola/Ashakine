import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/hooks/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <Toaster />
        <NextTopLoader
          color="#D4AF37" // Changed to match your gold color scheme
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // Disabled for cleaner UX
          easing="ease"
          speed={200}
          shadow="0 0 10px rgba(212, 175, 55, 0.5)"
          template='<div class="bar" role="bar"><div class="peg"></div></div>'
          zIndex={5000}
          showAtBottom={false}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
