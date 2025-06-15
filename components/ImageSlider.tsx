"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import sponsor1 from "../assets/images/sponsor1.jpg";
import sponsor2 from "../assets/images/sponsor2.jpg";
import sponsor3 from "../assets/images/sponsor3.jpg";
import { ImageItem } from "@/types";

const images: ImageItem[] = [
  { src: sponsor1, alt: "Image 1" },
  { src: sponsor2, alt: "Image 2" },
  { src: sponsor3, alt: "Image 3" },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mb-[3rem]">
      {/* Mobile: Carousel */}
      <div className="lg:hidden w-full h-[15rem] relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="h-full w-full"
              width={1000}
              height={500}
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Three-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="w-full h-[10rem] relative">
            <Image
              src={image.src}
              alt={image.alt}
              className="h-full w-full"
              width={1000}
              height={500}
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;