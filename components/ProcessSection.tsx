"use client";
import { motion } from "framer-motion";

import { 
  FiMessageSquare, 
  FiMail, 
  FiCalendar 
} from "react-icons/fi";
import { ProcessStep } from "./ProcessStep";

export const ProcessSection = () => {
  const steps = [
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
  ];

  return (
    <section className="py-24 px-6 bg-navy-900 relative overflow-hidden" id="process">
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

          {steps.map((step, index) => (
            <ProcessStep
              key={index} 
              step={step} 
              index={index} 
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};