"use client"

import { usePathname } from "next/navigation";

const Heading = () => {
  let pathname = usePathname();
  pathname = pathname.startsWith("/") ? pathname.substring(1) : pathname;
  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Split the pathname by "/" and filter out empty segments
  const parts = pathname.split('/').filter(segment => segment !== '');
  
  // Get the last segment
  const lastSegment = parts.length > 0 ? parts[parts.length - 1] : '';
  
  // Capitalize the first letter of the last segment
  const headingText = capitalizeFirstLetter(lastSegment);

  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{headingText}</h1>
    </div>
  );
};

export default Heading;
