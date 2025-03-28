"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Tomi’s UX research guide transformed my approach to user interviews. The insights were game-changing!",
    name: "Sarah K.",
    role: "Product Designer",
  },
  {
    quote: "The free guide helped me land my first UX research role. Clear, actionable, and invaluable.",
    name: "David M.",
    role: "Junior UX Researcher",
  },
  {
    quote: "Finally, a resource that cuts through the fluff. Tomi’s expertise shines in every tip.",
    name: "Amina L.",
    role: "UX Team Lead",
  },
];

export default function Testimonial() {
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="container-spacing py-[6rem] bg-white">
      <h2 className="primaryheading text-primary-green-200 text-center mb-12">
        What People Say
      </h2>

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="p-8 bg-primary-green-400 rounded-lg shadow-md text-center">
          <p className="paragraph-2 italic text-primary-green-50">
            {testimonials[current].quote}
          </p>
          <p className="mt-6 font-medium text-primary-green-100">
            — {testimonials[current].name}, {testimonials[current].role}
          </p>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-primary-green-300 hover:bg-primary-green-500 transition"
          >
            <ChevronLeft className="text-primary-green-100" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full border border-primary-green-300 hover:bg-primary-green-500 transition"
          >
            <ChevronRight className="text-primary-green-100" />
          </button>
        </div>
      </div>
    </section>
  );
}