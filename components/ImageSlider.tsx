"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import sponsor1 from "../assets/images/sponsor1.jpg";
import sponsor2 from "../assets/images/sponsor2.jpg";
import sponsor3 from "../assets/images/sponsor3.jpg";
import { ImageItem } from "@/types";

const images: ImageItem[] = [
  { src: sponsor1, alt: "Sponsor 1", title: "Seventh Adventure" },
  { src: sponsor2, alt: "Sponsor 2", title: "Mtn" },
  { src: sponsor3, alt: "Sponsor 3", title: "Social Boost" },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation via dots
  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="lg:w-[70%] w-full mb-12 mx-auto">

      {/* Mobile: Carousel */}
      <div
        className="lg:hidden w-full h-[10rem] relative overflow-hidden rounded-xl shadow-lg"
        role="region"
        aria-label="Image carousel"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : index < currentIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="h-full w-full rounded-xl"
              width={1000}
              height={500}
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-4">
              <span className="text-base font-semibold">{image.title}</span>
            </div>
          </div>
        ))}
        {/* Navigation Dots */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                index === currentIndex
                  ? "bg-purple-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>


    {/* Mobile: Carousel */}
      {/* Desktop: Three-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-[12rem] relative overflow-hidden rounded-xl shadow-md group"
            role="figure"
            aria-label={`Sponsor image ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="h-full w-full transition-transform duration-300 group-hover:scale-105"
              width={1000}
              height={500}
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;