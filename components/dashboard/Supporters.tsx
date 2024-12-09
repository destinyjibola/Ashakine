import React from "react";
import SupporterCard from "./SupporterCard";
import { ProjectResponse } from "@/lib/types"; // Make sure to import ProjectResponse

interface SupportersProps {
  projects: ProjectResponse[]; // Define the type for the projects prop
}

const Supporters: React.FC<SupportersProps> = ({ projects }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="paragraph-9 mb-4">Supported Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <SupporterCard
            key={project._id}
            project={project} // Pass the entire project object to the SupporterCard
          />
        ))}
      </div>
    </div>
  );
};

export default Supporters;
