import React from "react";
import Image from "next/image";
import { Progress } from "./ui/progress";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  shortdesc: string
  goalAmount: number; // Total goal for the donation
  currentAmount: number; // Current amount raised
  link: string;
}

const DonationCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
  goalAmount,
  shortdesc,
  currentAmount,
  link,
}) => {
  const percentageRaised = Math.min((currentAmount / goalAmount) * 100, 100);
  const formattedPercentage =
    percentageRaised % 1 === 0
      ? percentageRaised.toFixed(0)
      : percentageRaised.toFixed(2);
  return (
    <Link href={link}>
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
          <p className="paragraph-1  text-custom-gray-50 dark:text-white">
            {shortdesc}
          </p>

          <Progress value={+percentageRaised} />

          <div className="flex justify-between paragraph-1">
         
            <p>${currentAmount.toLocaleString()} raised</p>
            <p>{formattedPercentage}% completed</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DonationCard;
