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
} from "react-icons/fi";
import Navbar from "@/components/Navbar";

const App = () => {
  const [activeTab, setActiveTab] = useState("guests");
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

  const faqs = [
    {
      question: "How quickly can guests get a response?",
      answer:
        "Our virtual assistants respond within 15 minutes for standard requests, and immediately for urgent VIP requests.",
    },
    {
      question: "Is there a minimum contract for hotels?",
      answer:
        "No, we work on a flexible commission basis with no long-term contracts required.",
    },
    {
      question: "What countries do you cover?",
      answer:
        "We currently provide services in over 50 countries worldwide, with local experts in each major city.",
    },
  ];

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
        className="relative h-screen flex items-center justify-center overflow-hidden mt-[4rem]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/70 to-navy-900/90" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl font-bold text-gold-500 mb-6"
          >
            VAConcierge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xl md:text-2xl text-platinum mb-10"
          >
            Effortless Luxury, On Demand
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
      <section className="py-20 px-6 bg-navy-800" id="services">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-center text-gold-500 mb-16"
          >
            The Ultimate Concierge Experience
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FiStar className="text-3xl text-gold-500" />,
                title: "For Guests",
                description:
                  "A 24/7 virtual concierge for reservations, bookings, and VIP access.",
              },
              {
                icon: <FiDollarSign className="text-3xl text-gold-500" />,
                title: "For Hotels",
                description:
                  "Earn 20% commission on every guest request – no extra staff needed.",
              },
              {
                icon: <FiCheck className="text-3xl text-gold-500" />,
                title: "Discreet & Seamless",
                description:
                  "Fully white-labeled to match your brand's aesthetic.",
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
        id="hotels"
      >
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
              {(activeTab === "guests"
                ? [
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
                  ]
                : [
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
            Our Seamless Process
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
                title: "Make Your Request",
                description: "Contact us via WhatsApp, email, or QR code",
                accent: "from-gold-500/20 to-gold-500/40",
              },
              {
                icon: <FiMail className="text-2xl" />,
                title: "Personalize",
                description: "We tailor solutions to your exact needs",
                accent: "from-gold-600/20 to-gold-600/40",
              },
              {
                icon: <FiCalendar className="text-2xl" />,
                title: "Experience Magic",
                description: "Sit back while we handle every detail",
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

      {/* CTA Section */}
      <section
        id="contact"
        className="min-h-[70vh] flex flex-col md:flex-row group"
      >
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
        className="py-24 px-6 bg-gradient-to-b from-navy-800/40 to-navy-900/80 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gold-500/5 blur-2xl"></div>

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
            {faqs.map((faq, index) => (
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

          {/* CTA at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="font-sans text-platinum/80 mb-6">
              Still have questions?
            </p>
            <a
              href="https://wa.me/2347015990636"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-gold-500 hover:bg-gold-500/10 text-gold-500 font-sans font-medium py-3 px-8 rounded-full transition-colors duration-300"
            >
              Contact Us <FiArrowRight className="ml-2" />
            </a>
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
              VAConcierge © {new Date().getFullYear()} – Powered by Excellence
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
