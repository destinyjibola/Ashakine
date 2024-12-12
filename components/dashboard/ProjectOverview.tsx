"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import ProjectOverviewCard from "./ProjectOverviewCard";
import { TiPlus } from "react-icons/ti";

// Define the type for the project data
interface ProjectData {
  _id: string;
  title: string;
  shortdesc: string;
  goalAmount: number;
  currentAmount: number;
  startdate: string;
  enddate: string;
}

interface ProjectOverviewProps {
  projects: ProjectData[];
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projects }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="paragraph-9 mb-4">Projects</h2>
      {projects.length !> 0 && (
        <Link href={"/dashboard/project/addproject"}>
          <Button>
            Create Campaign <TiPlus />
          </Button>
        </Link>
      )}
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-2 mt-4">
          {projects.map((project) => (
            <ProjectOverviewCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 items-center justify-center h-40">
          <span className="text-gray-500">Created projects/campaigns will appear here</span>
          <Link href={"/dashboard/project/addproject"}><Button>Create a campaign</Button></Link>
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
