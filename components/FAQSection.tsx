"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { FAQItem } from "./FAQitem";


export const FAQSection = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes VA Concierge different from a hotel concierge?",
      answer: "Unlike traditional concierges who focus on in-house services, VA Concierge provides executive-level personal assistance. We handle business and lifestyle support, including meeting coordination, travel planning, social media management, and VIP reservations—ensuring an effortless stay for your guests",
    },
    {
      question: "How does this benefit my hotel or Airbnb business?",
      answer: "We elevate your guest experience by offering premium concierge support, leading to higher satisfaction, better reviews, increased repeat bookings, and additional revenue through service partnerships.",
    },
    {
      question: "How do guests access the service?",
      answer: "Guests can connect with their VA instantly via: QR code placed in the room (WhatsApp-based support), Hotel-provided tablet or web link, Front desk request for seamless integration with your team",
    },
    {
      question: "How is VA Concierge priced?",
      answer: "We offer flexible daily packages tailored to guest needs: ₦50K – Essential VA support for business & personal tasks, ₦80K – Priority service with VIP reservations & executive admin support, ₦250K – Full-scale business & lifestyle management for elite guests",
    },
    {
      question: "How quickly do VAs respond?",
      answer: "VA Concierge operates with near-instant responsiveness, handling guest requests within 5–10 minutes, ensuring a world-class hospitality experience.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-gradient-to-b from-navy-800/40 to-navy-900/80 relative overflow-hidden">
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
            <FAQItem 
              key={index}
              faq={faq}
              index={index}
              isOpen={openAccordion === index}
              toggleAccordion={toggleAccordion}
            />
          ))}
        </div>

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
  );
};