import Image from "next/image";
import React from "react";
import community from "../assets/icons/Community.svg";

const Categories = () => {
  return (
    <section id="donation" className="container-spacing section-spacing ">
      <h2 className=" primaryheading mb-10 text-custom-gray">Categories</h2>
      <div className="grid grid-cols-3">
        <div className="flex items-center space-x-3">
          <Image src={community.src} width={50} height={50} alt="community" />
          <h2 className="secondaryheading-5">Community Projects</h2>
        </div>

        <div className="flex items-center space-x-3">
          <Image src={community.src} width={50} height={50} alt="community" />
          <h2 className="secondaryheading-5">Education</h2>
        </div>

        <div className="flex items-center space-x-3">
          <Image src={community.src} width={50} height={50} alt="community" />
          <h2 className="secondaryheading-5">Arts</h2>
        </div>
      </div>
    </section>
  );
};

export default Categories;
