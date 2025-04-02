"use client";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface HeroSectionProps {
  backgroundImage: string;
}

export const HeroSection = ({ backgroundImage }: HeroSectionProps) => (
    <section
         style={{
           background: `url(${backgroundImage})`,
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
);