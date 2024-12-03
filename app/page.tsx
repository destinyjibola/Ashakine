import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import getAllProject from "@/helpers/getAllProject";
import { Suspense } from "react";
import { ProjectResponse } from "@/lib/types";
import DonationCard from "@/components/DonationCard";
import birthday from "../assets/crowdfund/birthday.webp";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function page() {
  const project = await getAllProject();

  
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />

      <section id="donation" className="container-spacing section-spacing ">
        <h2 className=" primaryheading text-center mb-10 text-custom-gray">Donations</h2>

        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Suspense fallback={<p>Course loading</p>}>
            {project.data.map((data: ProjectResponse) => {
              return (
                <DonationCard
                  key={data._id}
                  goalAmount={data.goalAmount}
                  currentAmount={data.currentAmount}
                  title={data.title}
                  shortdesc={data.shortdesc}
                  description={data.description}
                  imageSrc={data.images[0] || birthday.src}
                  altText={data.title}
                  link={`/donation/${data._id}`}
                />
              );
            })}
          </Suspense>
        </div>
      </section>
      <Categories />
      <Footer />
    </>
  );
}
