"use client"
import React, { useState } from "react";
import community from "../assets/crowdfund/community.jpeg";
import two from "../assets/crowdfund/chuch.jpeg";
import three from "../assets/crowdfund/birthday.webp";
import Image from "next/image";

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const images = [
    { src: community, alt: "The Woods" },
    { src: two, alt: "Cinque Terre" },
    { src: community, alt: "Mountains and fjords" },
    { src: three, alt: "Northern Lights" },
    { src: community, alt: "Nature and sunrise" },
    { src: two, alt: "Snowy Mountains" },
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const currentSlide = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className={`mySlides ${
            index === slideIndex ? "block" : "hidden"
          } relative`}
        >
          <div className="absolute top-0 left-0 p-2 text-sm text-white bg-gray-800 rounded-md">
            {index + 1} / {images.length}
          </div>
          <Image objectFit="cover" src={image.src} alt={image.alt} className="w-full h-[24rem]  rounded-lg" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-r hover:bg-opacity-70 focus:outline-none"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-l hover:bg-opacity-70 focus:outline-none"
      >
        ❯
      </button>

      {/* Thumbnail Images */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => currentSlide(index)}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
              index === slideIndex ? "border-blue-500" : "border-transparent"
            } hover:opacity-75`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
