import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import DonationSection from "@/components/DonationSection";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <DonationSection />
      <Categories />
      <Footer />
    </>
  );
}
