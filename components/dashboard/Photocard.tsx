import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi"; // Import a delete icon from react-icons

interface Photoprop {
  url: string;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>; // Accept either void or Promise<void>

}

const Photocard = ({ url, onDelete }: Photoprop) => {
  return (
    <div className="relative">
      <Image src={url} alt="image" width={100} height={60} className="flex-1" />

      <button
        onClick={onDelete}
        className="absolute top-1 right-1 text-white bg-red-950 bg-opacity-90 hover:bg-opacity-100 rounded-full p-1"
      >
        <FiTrash2 size={15} />
      </button>
    </div>
  );
};

export default Photocard;
