"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroimage from "../assets/images/heroimage.jpg";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiMessageSquare,
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiMapPin,
  FiShoppingBag,
  FiStar,
  FiUsers,
  FiDollarSign,
  FiHome,
  FiUser,
  FiClock,
  FiSmile,
  FiCompass,
  FiCamera,
  FiPhone,
} from "react-icons/fi";
import Navbar from "@/components/Navbar";

const App = () => {
  const [activeTab, setActiveTab] = useState("business"); // Initialize with default tab
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("fade-in");
      }, i * 200);
    });
  }, []);

  const toggleAccordion = (index: any) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />

    </div>
  );
};

export default App;
