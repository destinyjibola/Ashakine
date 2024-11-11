import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
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
        <Link href={link}>
          <Button className="self-start rounded-3xl bg-primary-color">
            Learn more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
