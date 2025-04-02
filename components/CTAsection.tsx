"use client";
import { motion } from "framer-motion";
import { FiArrowRight, FiUser, FiHome } from "react-icons/fi";

export const CTASection = () => (
  <section id="contact" className="min-h-[70vh] flex flex-col md:flex-row group">
    {/* Guests Section */}
    <div className="w-full md:w-1/2 bg-navy-800 flex items-center justify-center p-12 relative overflow-hidden transition-all duration-500 hover:md:w-[55%]">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-900/30 to-transparent z-0"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gold-500/10 blur-xl animate-pulse"></div>

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
          Your personal assistant awaits. Experience effortless luxury with our 24/7 concierge service.
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

      <div className="absolute bottom-8 right-8 opacity-10 md:opacity-20">
        <FiUser className="text-8xl text-platinum" />
      </div>
    </div>

    {/* Hotels Section */}
    <div className="w-full md:w-1/2 bg-gold-500 flex items-center justify-center p-12 relative overflow-hidden transition-all duration-500 hover:md:w-[55%]">
      <div className="absolute inset-0 bg-gradient-to-l from-gold-600/30 via-gold-600/10 to-transparent z-0"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-navy-900/10 blur-xl animate-pulse"></div>

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
          Turn guest stays into revenue. Partner with us to offer premium services without the overhead.
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

      <div className="absolute bottom-8 left-8 opacity-10 md:opacity-20">
        <FiHome className="text-8xl text-navy-900" />
      </div>
    </div>
  </section>
);