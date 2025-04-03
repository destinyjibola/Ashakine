import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VAConcierge | Premium Luxury Concierge Services for Hotels & Guests",
  description: "24/7 white-label concierge services elevating hospitality experiences. For hotels: boost revenue with our commission-based solutions. For guests: access VIP services worldwide.",
  keywords: [
    "luxury concierge",
    "hotel concierge services",
    "VIP travel assistance",
    "white-label concierge",
    "24/7 concierge",
    "hospitality solutions",
    "premium guest services"
  ],
  openGraph: {
    title: "VAConcierge | Luxury Concierge Services",
    description: "Elevating hospitality through seamless, white-labeled executive assistance for hotels and discerning guests.",
    url: "https://vaconcierge.com",
    siteName: "VAConcierge",
    images: [
      {
        url: "https://res.cloudinary.com/destiny1233/image/upload/v1743677577/heroimage_tqfrf0.jpg",
        width: 1200,
        height: 630,
        alt: "VAConcierge Luxury Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VAConcierge | Luxury Concierge Services",
    description: "Premium white-label concierge solutions for hotels and VIP guests",
    images: ["https://vaconcierge.com/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://vaconcierge.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#1A2A3A", // Navy color
  category: "hospitality",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
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
        <Navbar/>
        {children}
      </body>
    </html>
  );
}