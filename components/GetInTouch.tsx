import React from 'react';
import { Button } from './ui/button';
import hero from '../assets/images/Topographic.svg';

const GetInTouch = () => {
  return (
    <div 
      className="container-spacing py-[6rem] text-white"
      style={{
        backgroundColor: "#E6FEDA", // Apply solid background color
        backgroundImage: `url(${hero.src})`, // Add background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className=" px-2 md:px-[6rem] lg:px-[12rem] mx-auto text-center">
        <p className="text-[32px] mb-8 font-medium text-black">
          Have a question about UX research or looking to level up your skills?
          I am here to help you succeed on your research journey.
        </p>

        <Button
          variant="secondary"
          className="mt-6 py-6 text-lg font-medium px-10 border border-primary-green-300 hover:bg-primary-green-500 transition bg-primary-green-50 text-white hover:text-black"
        >
          Get in Touch
        </Button>
      </div>
    </div>
  );
};

export default GetInTouch;
