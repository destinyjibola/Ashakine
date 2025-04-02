"use client";
import { motion } from "framer-motion";
import { FiStar, FiDollarSign, FiCheck } from "react-icons/fi";

export const ValueProposition = () => {
  const items = [
    {
      icon: <FiStar className="text-3xl text-gold-500" />,
      title: "For Guests",
      description: "A 24/7 virtual concierge for reservations, bookings, and VIP access.",
    },
    {
      icon: <FiDollarSign className="text-3xl text-gold-500" />,
      title: "For Hotels",
      description: "Earn 20% commission on every guest request – no extra staff needed.",
    },
    {
      icon: <FiCheck className="text-3xl text-gold-500" />,
      title: "Discreet & Seamless",
      description: "Fully white-labeled to match your brand's aesthetic.",
    },
  ];

  return (
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
          {items.map((item, index) => (
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
  );
};