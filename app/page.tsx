"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import birthday from "../assets/crowdfund/birthday.webp";
import useFcmToken from "@/hooks/useFcmToken";
import Cookies from "js-cookie";
import { Category, ProjectResponse } from "@/lib/types";
import generateEnhancedFingerprint from "@/lib/fingerPrint";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Page = () => {
  const [fingerprint, setFingerprint] = useState<string | null>();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const user = Cookies.get("user"); 
  const { token, notificationPermissionStatus } = useFcmToken();

  // Save the FCM token if the notification permission is granted
  useEffect(() => {
    const saveFcmToken = async () => {
      if (notificationPermissionStatus === "granted" && token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/updateProfile`,
            { token, device: fingerprint, _id: user }
          );
          console.log("FCM token saved:", response.data.message);
        } catch (error) {
          console.error("Error saving FCM token:", error);
        }
      }
    };

    saveFcmToken();
  }, [notificationPermissionStatus, fingerprint, token, user]);






  useEffect(() => {
    const fetchFingerprint = async () => {
      const fingerprintResult = await generateEnhancedFingerprint();
      setFingerprint(fingerprintResult);
      console.log("Browser Fingerprint:", fingerprintResult);
    };

    fetchFingerprint();
  }, []);



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/getAllPost`,
          { headers: { "Cache-Control": "no-store" } }
        );
        setProjects(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />

      <section id="donation" className="container-spacing section-spacing">
        <h2 className="primaryheading text-custom-gray">
          Donations 
        </h2>

        <p className="paragraph-1 mb-6">Top campaigns</p>

        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading donations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            projects.map((data: ProjectResponse) => (
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
            ))
          )}
        </div>
      </section>

      <Categories />
      <Footer />
    </>
  );
};

export default Page;
