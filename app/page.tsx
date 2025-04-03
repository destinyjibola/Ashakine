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

      {/* Hero Section */}
      <section
        style={{
          background: `url(${heroimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative flex py-[7rem] justify-center overflow-hidden mt-[6rem]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/70 to-navy-900/90" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Premium </span>
            <span className="text-white">Virtual </span>
            <span className="text-gold-500">Assistance </span>
            <span className="text-white">for </span>
            <span className="text-gold-500">Hospitality</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-2xl md:text-3xl text-platinum mb-8"
          >
            Seamless Business & Leisure Support for Hotels & aAirbnb Guests
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-lg md:text-xl text-white mb-10 max-w-3xl mx-auto"
          >
            We provide a seamless virtual assistant experience tailored to hotel
            and Airbnb guest stays. Whether they need business support or
            exclusive lifestyle services, our vetted virtual assistants handle
            every request, enhancing service quality without additional staffing
            costs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="https://wa.me/2347015990636"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-sans font-semibold py-3 px-8 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              Get Assistance Now <FiArrowRight className="ml-2" />
            </a>
            <a
              href="https://wa.me/2347015990636"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold-500 hover:bg-gold-500 hover:bg-opacity-10 text-gold-500 font-sans font-semibold py-3 px-8 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              Become a Partner
            </a>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6 bg-navy-800" id="">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-center text-gold-500 mb-16"
          >
            Why Partner with VAConcierge?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <FiUsers className="text-3xl text-gold-500" />,
                title: "Expand Your Guest Offerings",
                description:
                  "Provide high-end concierge services without additional staff costs.",
              },
              {
                icon: <FiDollarSign className="text-3xl text-gold-500" />,
                title: "Increase Revenue",
                description: "Hotels earn commissions on every service booked.",
              },

              {
                icon: <FiClock className="text-3xl text-gold-500" />,
                title: "24/7 Availability",
                description:
                  "Our VAs are always ready to assist, ensuring top-tier guest satisfaction.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-navy-900 p-8 rounded-lg text-center border border-gold-500/10 hover:border-gold-500/30 transition-colors"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl text-gold-400 mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-platinum">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Showcase */}
      <section
        className="py-20 px-6 bg-navy-900/50 backdrop-blur-sm"
        id="services"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold-400 mb-4">
              Our Services
            </h2>
            <p className="font-sans text-xl text-white max-w-3xl mx-auto">
              Comprehensive support tailored for business, lifestyle, and travel
              needs
            </p>
          </motion.div>

          <div className="mb-12 md:mb-16">
            {/* Desktop - Original Horizontal Tabs */}
            <div className="hidden md:flex justify-center">
              <div className="inline-flex rounded-full p-1 bg-navy-800 border border-gold-500/20">
                <button
                  onClick={() => setActiveTab("business")}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === "business"
                      ? "bg-gold-500 text-navy-900 shadow-lg"
                      : "text-platinum hover:bg-navy-700"
                  }`}
                >
                  Business Support
                </button>
                <button
                  onClick={() => setActiveTab("lifestyle")}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === "lifestyle"
                      ? "bg-gold-500 text-navy-900 shadow-lg"
                      : "text-platinum hover:bg-navy-700"
                  }`}
                >
                  Lifestyle Services
                </button>
                <button
                  onClick={() => setActiveTab("travel")}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === "travel"
                      ? "bg-gold-500 text-navy-900 shadow-lg"
                      : "text-platinum hover:bg-navy-700"
                  }`}
                >
                  Travel Assistance
                </button>
              </div>
            </div>

            {/* Mobile - Creative Vertical Selector */}
            <div className="md:hidden relative">
              <div className="absolute -inset-1 bg-gold-500/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-navy-800 border border-gold-500/20 rounded-xl overflow-hidden">
                {["business", "lifestyle", "travel"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full px-6 py-4 text-left flex items-center transition-all ${
                      activeTab === tab
                        ? "bg-gold-500/10 text-gold-400"
                        : "text-platinum hover:bg-navy-700/50"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 ${
                        activeTab === tab ? "bg-gold-500" : "bg-gold-500/30"
                      }`}
                    ></div>
                    <span className="font-medium">
                      {tab === "business" && "Business Support"}
                      {tab === "lifestyle" && "Lifestyle Services"}
                      {tab === "travel" && "Travel Assistance"}
                    </span>
                    {activeTab === tab && (
                      <FiChevronDown className="ml-auto text-gold-500" />
                    )}
                  </button>
                ))}
              </div>
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
              {(activeTab === "business"
                ? [
                    {
                      icon: <FiMail className="text-2xl" />,
                      title: "Email & Calendar",
                      items: [
                        "Professional email management",
                        "Meeting scheduling",
                        "Calendar optimization",
                      ],
                    },
                    {
                      icon: <FiBriefcase className="text-2xl" />,
                      title: "Administrative",
                      items: [
                        "Research assistance",
                        "Document preparation",
                        "Co-working space bookings",
                      ],
                    },
                    {
                      icon: <FiDollarSign className="text-2xl" />,
                      title: "Executive Support",
                      items: [
                        "Presentation preparation",
                        "Business travel coordination",
                        "Virtual office management",
                      ],
                    },
                  ]
                : activeTab === "lifestyle"
                ? [
                    {
                      icon: <FiStar className="text-2xl" />,
                      title: "VIP Reservations",
                      items: [
                        "Exclusive restaurant bookings",
                        "Premium event access",
                        "Private club arrangements",
                      ],
                    },
                    {
                      icon: <FiCamera className="text-2xl" />,
                      title: "Transportation",
                      items: [
                        "Chauffeur services",
                        "Luxury car rentals",
                        "Private driver coordination",
                      ],
                    },
                    {
                      icon: <FiSmile className="text-2xl" />,
                      title: "Personal Care",
                      items: [
                        "Spa & salon appointments",
                        "Personal stylist coordination",
                        "Wellness program booking",
                      ],
                    },
                  ]
                : [
                    {
                      icon: <FiMapPin className="text-2xl" />,
                      title: "Accommodations",
                      items: [
                        "Flight & hotel bookings",
                        "Boutique property selection",
                        "Last-minute reservations",
                      ],
                    },
                    {
                      icon: <FiCompass className="text-2xl" />,
                      title: "Local Experiences",
                      items: [
                        "Personalized city guides",
                        "Private tour arrangements",
                        "Off-the-beaten-path recommendations",
                      ],
                    },
                    {
                      icon: <FiClock className="text-2xl" />,
                      title: "Concierge",
                      items: [
                        "24/7 travel assistance",
                        "Ticket & event bookings",
                        "Custom itinerary planning",
                      ],
                    },
                  ]
              ).map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-navy-800 p-8 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-all group"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mr-4 group-hover:bg-gold-500/20 transition-colors">
                      {React.cloneElement(service.icon, {
                        className: "text-gold-500",
                      })}
                    </div>
                    <h3 className="font-serif text-xl text-gold-400">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start font-sans text-platinum"
                      >
                        <FiCheck className="text-gold-500 mt-1 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section
        className="py-24 px-6 bg-navy-900 relative overflow-hidden"
        id="process"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute left-1/2 top-1/4 w-1 h-1 rounded-full bg-gold-500 shadow-[0_0_20px_10px_rgba(212,175,55,0.3)] animate-float"></div>
          <div className="absolute left-1/3 top-3/4 w-1 h-1 rounded-full bg-gold-500 shadow-[0_0_15px_5px_rgba(212,175,55,0.3)] animate-float delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="font-serif text-5xl text-center text-gold-500 mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="relative">
            {/* Diagonal flow line */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M10 20 C 30 30, 40 40, 50 50 C 60 60, 70 70, 90 80"
                stroke="rgba(212, 175, 55, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="0 1"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {[
              {
                icon: <FiMessageSquare className="text-2xl" />,
                title: "Guests Request a Service",
                description: "Via WhatsApp or our platform",
                accent: "from-gold-500/20 to-gold-500/40",
              },
              {
                icon: <FiUsers className="text-2xl" />,
                title: "Our Virtual Assistants Handle Everything",
                description: "From bookings to scheduling",
                accent: "from-gold-600/20 to-gold-600/40",
              },
              {
                icon: <FiDollarSign className="text-2xl" />,
                title: "The Hotel Earns a Commission",
                description: "While we provide elite concierge support",
                accent: "from-gold-700/20 to-gold-700/40",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-stretch mb-24 last:mb-0 ${
                  index % 2 === 0 ? "md:pl-0" : "md:pr-0"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Step number and connector */}
                <div
                  className={`hidden md:flex w-1/2 items-center relative ${
                    index % 2 === 0
                      ? "justify-end pr-12"
                      : "justify-start pl-12 order-last"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 ${
                      index % 2 === 0 ? "right-0" : "left-0"
                    } transform -translate-y-1/2`}
                  >
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center text-gold-500 font-serif text-xl font-bold z-10 border-2 border-gold-500/30`}
                      >
                        {index + 1}
                      </div>
                      {index < 2 && (
                        <motion.div
                          className={`absolute ${
                            index % 2 === 0 ? "right-full" : "left-full"
                          } top-1/2 w-16 h-0.5 bg-gradient-to-r ${
                            index % 2 === 0
                              ? "from-gold-500/30 to-transparent"
                              : "from-transparent to-gold-500/30"
                          }`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.2 + 0.3,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-0" : "md:pl-0"
                  }`}
                >
                  <motion.div
                    className={`relative bg-gradient-to-br from-navy-800 to-navy-900 p-8 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 shadow-xl overflow-hidden ${
                      index % 2 === 0
                        ? "md:rounded-tr-none"
                        : "md:rounded-tl-none"
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    {/* Mobile step number */}
                    <div className="md:hidden absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-navy-900 font-bold z-10">
                      {index + 1}
                    </div>

                    {/* Animated icon background */}
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-gold-500/5 blur-md"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center mr-6`}
                        >
                          {React.cloneElement(step.icon, {
                            className: "text-gold-400 text-3xl",
                          })}
                        </div>
                        <h3 className="font-serif text-2xl text-gold-400">
                          {step.title}
                        </h3>
                      </div>

                      <p className="font-sans text-lg text-platinum/80 pl-2 border-l-2 border-gold-500/30">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
      <section
        className="py-24 px-6 bg-gradient-to-b from-navy-900 to-navy-800 relative overflow-hidden"
        id="testimonials"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gold-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-gold-500 mb-4">
              Voices of Excellence
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-transparent mx-auto mb-4"></div>
            <p className="font-sans text-xl text-platinum/80 max-w-2xl mx-auto">
              Trusted by hospitality professionals and discerning travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 - Traveler */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-gold-500/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-navy-800/80 backdrop-blur-sm p-8 rounded-xl border border-gold-500/20 h-full flex flex-col">
                <div className="text-5xl font-serif text-gold-500/20 mb-4">
                  &ldquo;
                </div>
                <blockquote className="font-sans text-platinum/90 italic mb-6 flex-grow">
                  &ldquo;I needed urgent flight changes in Abuja, and
                  VAConcierge handled everything in minutes. Their 24/7
                  availability and attention to detail are unmatched - like
                  having a personal assistant on demand!&rdquo;
                </blockquote>
                <div className="border-t border-gold-500/20 pt-4">
                  <p className="font-sans font-medium text-gold-400">
                    Henry T.
                  </p>
                  <p className="font-sans text-sm text-platinum/70">
                    Frequent Traveler & Consultant
                  </p>
                </div>
                <div className="absolute bottom-6 right-6 text-gold-500/10 group-hover:text-gold-500/30 transition-colors">
                  <FiUser className="text-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 - Hotel Manager */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-gold-500/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-navy-800/80 backdrop-blur-sm p-8 rounded-xl border border-gold-500/20 h-full flex flex-col">
                <div className="text-5xl font-serif text-gold-500/20 mb-4">
                  &ldquo;
                </div>
                <blockquote className="font-sans text-platinum/90 italic mb-6 flex-grow">
                  &ldquo;VAConcierge transformed our guest services. From
                  restaurant bookings to chauffeur arrangements, they handle
                  everything professionally. Our satisfaction scores increased
                  30% without additional staff costs.&rdquo;
                </blockquote>
                <div className="border-t border-gold-500/20 pt-4">
                  <p className="font-sans font-medium text-gold-400">
                    Adeola S.
                  </p>
                  <p className="font-sans text-sm text-platinum/70">
                    Hotel Manager, Lagos
                  </p>
                </div>
                <div className="absolute bottom-6 right-6 text-gold-500/10 group-hover:text-gold-500/30 transition-colors">
                  <FiHome className="text-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 - Corporate Client */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-gold-500/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-navy-800/80 backdrop-blur-sm p-8 rounded-xl border border-gold-500/20 h-full flex flex-col">
                <div className="text-5xl font-serif text-gold-500/20 mb-4">
                  &ldquo;
                </div>
                <blockquote className="font-sans text-platinum/90 italic mb-6 flex-grow">
                  &ldquo;Planning our executive retreat went from stressful to
                  seamless with VAConcierge. They coordinated venues, RSVPs, and
                  local experiences flawlessly - allowing our team to focus on
                  strategy.&rdquo;
                </blockquote>
                <div className="border-t border-gold-500/20 pt-4">
                  <p className="font-sans font-medium text-gold-400">
                    Chioma M.
                  </p>
                  <p className="font-sans text-sm text-platinum/70">
                    Head of People, Multinational
                  </p>
                </div>
                <div className="absolute bottom-6 right-6 text-gold-500/10 group-hover:text-gold-500/30 transition-colors">
                  <FiBriefcase className="text-3xl" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-gold-500/20"
          >
            {[
              "100% Response Rate",
              "24/7 Availability",
              "5-Star Rated",
              "90% Repeat Clients",
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <FiCheck className="text-gold-500 mr-2" />
                <span className="font-sans text-platinum/90">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[70vh] flex flex-col md:flex-row group">
        {/* Guests Section */}
        <div className="w-full md:w-1/2 bg-navy-800 flex items-center justify-center p-12 relative overflow-hidden transition-all duration-500 hover:md:w-[55%]">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-900/30 to-transparent z-0"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gold-500/10 blur-xl animate-pulse"></div>

          {/* Content */}
          <div className="relative z-10 max-w-md">
            <motion.h2
              className="font-serif text-4xl md:text-5xl text-gold-500 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              For Guests
            </motion.h2>
            <motion.p
              className="font-sans text-lg text-platinum/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your personal assistant awaits. Experience effortless luxury with
              our 24/7 concierge service.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="https://wa.me/2347015990636"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gold-500 hover:bg-gold-400 text-navy-900 font-sans font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 group-hover:scale-[1.02]"
              >
                Message Us
                <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-8 right-8 opacity-10 md:opacity-20">
            <FiUser className="text-8xl text-platinum" />
          </div>
        </div>

        {/* Hotels Section */}
        <div className="w-full md:w-1/2 bg-gold-500 flex items-center justify-center p-12 relative overflow-hidden transition-all duration-500 hover:md:w-[55%]">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-l from-gold-600/30 via-gold-600/10 to-transparent z-0"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-navy-900/10 blur-xl animate-pulse"></div>

          {/* Content */}
          <div className="relative z-10 max-w-md">
            <motion.h2
              className="font-serif text-4xl md:text-5xl text-navy-900 mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              For Hotels
            </motion.h2>
            <motion.p
              className="font-sans text-lg text-navy-900/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Turn guest stays into revenue. Partner with us to offer premium
              services without the overhead.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="https://wa.me/2347015990636"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-navy-900 hover:bg-navy-900/10 text-navy-900 font-sans font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-navy-900/10 group-hover:scale-[1.02]"
              >
                Schedule a Demo
                <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-8 left-8 opacity-10 md:opacity-20">
            <FiHome className="text-8xl text-navy-900" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-24 px-6 relative overflow-hidden bg-navy-900"
      >
        {/* Luxury Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diamond Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>

          {/* Animated Gold Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute rounded-full bg-gold-500/30"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold-500/20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold-500/20"></div>

          {/* Floating Luxury Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-40 -top-40 w-80 h-80 opacity-10"
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#D4AF37"
                d="M45,-70.8C58.4,-61.7,69.6,-50.1,76.4,-36C83.2,-21.9,85.5,-5.3,81.7,8.1C77.9,21.5,68,32.8,56.1,42.9C44.2,53,30.3,61.9,14.4,70.3C-1.5,78.7,-19.5,86.6,-33.9,81.3C-48.3,76,-59.1,57.5,-68.4,38.9C-77.7,20.3,-85.5,1.6,-83.1,-15.9C-80.7,-33.4,-68.1,-49.7,-52.8,-58.5C-37.5,-67.2,-19.5,-68.4,-2.2,-65.8C15.2,-63.2,30.3,-56.8,45,-70.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-gold-500 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-platinum/80 max-w-2xl mx-auto">
              Quick answers to common queries about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How does this service work?",
                answer:
                  "Guests simply contact us via WhatsApp or the platform, and our team takes care of everything—from securing reservations to arranging personalized services.",
              },
              {
                question: "Why should a hotel partner with VAConcierge?",
                answer:
                  "We help hotels provide luxury concierge services without hiring additional staff, while also generating commission-based revenue.",
              },
              {
                question:
                  "What makes VAConcierge different from an in-house concierge?",
                answer:
                  "Unlike traditional hotel concierges, we offer business support, executive assistance, and luxury lifestyle services beyond the hotel's premises.",
              },
              {
                question: "How are virtual assistants vetted?",
                answer:
                  "Our VAs are highly trained professionals with expertise in executive assistance, travel coordination, and hospitality. Each assistant undergoes thorough screening before joining.",
              },
              {
                question: "How do payments work?",
                answer:
                  "Hotels can opt for a commission-based model where they receive a percentage of each service booked, or guests can pay directly for their requested services.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-navy-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-navy-700/50 hover:border-gold-500/30 transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`flex justify-between items-center w-full text-left p-6 focus:outline-none transition-colors ${
                    openAccordion === index ? "bg-navy-700/30" : ""
                  }`}
                >
                  <span className="font-sans font-medium text-lg text-platinum flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`text-gold-500 transition-transform duration-300 flex-shrink-0 ${
                      openAccordion === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 ml-10">
                        <div className="font-sans text-platinum/80 border-l-2 border-gold-500/40 pl-4">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Contact CTA */}
          <motion.div
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-20"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="https://wa.me/2347015990636"
                  className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg shadow-emerald-500/20"
                >
                  <FiMessageSquare className="text-xl" />
                  WhatsApp
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  href="mailto:creativetorchagency@gmail.com"
                  className="flex-1 flex items-center justify-center gap-3 bg-navy-700 hover:bg-navy-600 border border-gold-500/30 text-gold-400 font-medium py-3 px-6 rounded-lg transition-all shadow-lg shadow-gold-500/10"
                >
                  <FiMail className="text-xl" />
                  Email
                </motion.a>
              </div>

              <div className="relative w-full max-w-xs">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gold-500/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-navy-900 px-3 text-sm text-platinum/50">
                    Direct line to our concierge
                  </span>
                </div>
              </div>

              <a
                href="tel:+2347015990636"
                className="group flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
              >
                <FiPhone className="text-lg" />
                <span className="font-medium">+234 701 599 0636</span>
                <FiArrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 py-12 px-6 border-t border-gold-500/10 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gold-500/5 blur-2xl -z-0"></div>
        <div className="absolute top-1/4 right-10 w-16 h-16 rounded-full bg-gold-500/5 blur-xl -z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center group">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center mr-3 transition-all duration-300 group-hover:rotate-12"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-serif text-lg text-navy-900 font-bold">
                    VC
                  </span>
                </motion.div>
                <h3 className="font-serif text-2xl text-gold-500">
                  VAConcierge
                </h3>
              </div>
              <p className="font-sans text-platinum/90 max-w-md mt-3 leading-relaxed">
                Elevating hospitality through seamless, white-labeled executive
                assistance.
              </p>
            </div>
            <div className="flex space-x-6">
              {[
                {
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  label: "LinkedIn",
                },
                {
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                  label: "Instagram",
                },
                {
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 1.397c-.197.098-.561.278-.796.372-.08.036-.173.036-.248-.025-.074-.061-.173-.174-.272-.347-.099-.173-.372-.611-.446-.793-.074-.181-.074-.298-.05-.372.024-.074.074-.124.174-.198.099-.074.223-.148.322-.223.1-.074.124-.074.174-.05.05.025.099.124.149.248.05.124.223.471.272.578.05.099.099.174.025.272-.025.074-.05.061-.099.05-.05-.012-.148-.05-.248-.099zM12 0a12 12 0 00-9.5 19.32L0 24l4.68-2.5A12 12 0 1012 0zm0 22a9.94 9.94 0 01-5.33-1.55l-.38-.23-3.96 1.06 1.06-3.89-.24-.38A10 10 0 1112 22z" />
                    </svg>
                  ),
                  label: "WhatsApp",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="https://wa.me/2347015990636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-platinum hover:text-gold-500 transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-navy-700 pt-8">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6 md:mb-0">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (link, index) => (
                  <motion.a
                    key={index}
                    href="https://wa.me/2347015990636"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-platinum/90 hover:text-gold-500 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {link}
                  </motion.a>
                )
              )}
            </nav>
            <motion.p
              className="font-sans text-platinum/80"
              whileHover={{ scale: 1.02 }}
            >
              VAConcierge © {new Date().getFullYear()} 
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
