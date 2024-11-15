import Image from 'next/image';
import React from 'react';

interface OverviewCardProps {
  iconSrc: string;
  title: string;
  value: string | number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ iconSrc, title, value }) => {
  return (
    <div className='flex rounded-lg items-center cursor-pointer space-x-6 w-[20rem] py-6 px-6 border-2 border-bordercolor shadow-lg transition-all transform hover:bg-gray-100 hover:shadow-xl hover:shadow-gray-400/50 duration-300 ease-in-out'>
      <Image src={iconSrc} alt={title} width={50} height={50} />
      <div className='flex flex-col space-y-2'>
        <span className='paragraph-1'>{title}</span>
        <span className='paragraph-7'>{value}</span>
      </div>
    </div>
  );
};

export default OverviewCard;
