"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FiCheck } from "react-icons/fi";

interface ServiceCardProps {
  service: {
    icon: ReactNode;
    title: string;
    items: string[];
  };
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-navy-800 p-8 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-all group"
  >
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mr-4 group-hover:bg-gold-500/20 transition-colors">
        {service.icon}
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
);