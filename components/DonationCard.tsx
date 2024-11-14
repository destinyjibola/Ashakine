import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  link: string;
}

const DonationCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
  link,
}) => {
  return (
    <div className="flex flex-col h-full p-4 rounded-xl shadow-md cursor-pointer">
      <Image
        src={imageSrc}
        alt={altText}
        width={1000}
        height={400}
        className="rounded-tr-xl rounded-tl-xl h-[18rem] object-cover"
      />

      <h2 className="secondaryheading mt-4 mb-2 h-auto md:h-[60px] text-custom-gray dark:text-white">
        {title}
      </h2>

      <div className="flex flex-col space-y-4 flex-grow justify-between">
        <p className="paragraph-1 text-custom-gray-50 dark:text-white">{description}</p>

        <Progress value={33} />
        
        <div className="flex justify-between paragraph-1">
            <p>$20,487 raised</p>
            <p>77%  completed</p>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
