"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
  index: number;
  isOpen: boolean;
  toggleAccordion: (index: number) => void;
}

export const FAQItem = ({ faq, index, isOpen, toggleAccordion }: FAQItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-navy-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-navy-700/50 hover:border-gold-500/30 transition-all"
  >
    <button
      onClick={() => toggleAccordion(index)}
      className={`flex justify-between items-center w-full text-left p-6 focus:outline-none transition-colors ${
        isOpen ? "bg-navy-700/30" : ""
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
          isOpen ? "transform rotate-180" : ""
        }`}
      />
    </button>

    <AnimatePresence>
      {isOpen && (
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
);