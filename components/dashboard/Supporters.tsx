"use client";
import React from "react";
import SupporterCard from "./SupporterCard";
import { ProjectResponse } from "@/lib/types"; // Make sure to import ProjectResponse
import { Button } from "../ui/button";
import Link from "next/link";

interface SupportersProps {
  projects: ProjectResponse[]; // Define the type for the projects prop
}

const Supporters: React.FC<SupportersProps> = ({ projects }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="paragraph-9 mb-4">Supported Projects</h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project._id} href={`/`}>
              {" "}
              <SupporterCard project={project} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 items-center justify-center h-40">
          <span className="text-gray-500 text-center">
            No supported projects at the moment. Supported projects will appear
            here.
          </span>
          <Link href={"/"}>
            <Button>Explore</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Supporters;
