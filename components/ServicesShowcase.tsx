"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FiBriefcase, 
  FiMapPin, 
  FiStar, 
  FiDollarSign, 
  FiUsers, 
  FiCheck 
} from "react-icons/fi";
import { ServiceCard } from "./ServiceCard";

export const ServicesShowcase = () => {
  const [activeTab, setActiveTab] = useState("guests");

  const guestServices = [
    {
      icon: <FiBriefcase className="text-2xl" />,
      title: "Business & Productivity",
      items: [
        "Meeting scheduling",
        "Email management",
        "Workspace bookings",
      ],
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Travel & Logistics",
      items: [
        "Flight bookings",
        "Luxury transportation",
        "VIP airport services",
      ],
    },
    {
      icon: <FiStar className="text-2xl" />,
      title: "Lifestyle",
      items: [
        "Fine dining reservations",
        "Private spa",
        "Personal shopping",
      ],
    },
  ];

  const hotelServices = [
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Revenue Growth",
      items: [
        "20% commission",
        "Premium upsells",
        "No upfront costs",
      ],
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "Guest Experience",
      items: [
        "24/7 concierge",
        "White-glove service",
        "Retention programs",
      ],
    },
    {
      icon: <FiCheck className="text-2xl" />,
      title: "Integration",
      items: [
        "No tech setup",
        "QR code access",
        "White-labeled",
      ],
    },
  ];

  return (
    <section className="py-20 px-6 bg-navy-900/50 backdrop-blur-sm" id="hotels">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full p-1 bg-navy-800 border border-gold-500/20">
            <button
              onClick={() => setActiveTab("guests")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "guests"
                  ? "bg-gold-500 text-navy-900 shadow-lg"
                  : "text-platinum hover:bg-navy-700"
              }`}
            >
              For Guests
            </button>
            <button
              onClick={() => setActiveTab("hotels")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "hotels"
                  ? "bg-gold-500 text-navy-900 shadow-lg"
                  : "text-platinum hover:bg-navy-700"
              }`}
            >
              For Hotels
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {(activeTab === "guests" ? guestServices : hotelServices).map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};