"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProcessStepProps {
  step: {
    icon: ReactNode;
    title: string;
    description: string;
    accent: string;
  };
  index: number;
  totalSteps: number;
}

export const ProcessStep = ({ step, index, totalSteps }: ProcessStepProps) => (
  <motion.div
    className={`flex flex-col md:flex-row items-stretch mb-24 last:mb-0 ${
      index % 2 === 0 ? "md:pl-0" : "md:pr-0"
    }`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <div
      className={`hidden md:flex w-1/2 items-center relative ${
        index % 2 === 0 ? "justify-end pr-12" : "justify-start pl-12 order-last"
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
          {index < totalSteps - 1 && (
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

    <div
      className={`w-full md:w-1/2 ${
        index % 2 === 0 ? "md:pr-0" : "md:pl-0"
      }`}
    >
      <motion.div
        className={`relative bg-gradient-to-br from-navy-800 to-navy-900 p-8 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 shadow-xl overflow-hidden ${
          index % 2 === 0 ? "md:rounded-tr-none" : "md:rounded-tl-none"
        }`}
        whileHover={{ y: -5 }}
      >
        <div className="md:hidden absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-navy-900 font-bold z-10">
          {index + 1}
        </div>

        <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-gold-500/5 blur-md"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center mr-6`}
            >
              {step.icon}
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
);