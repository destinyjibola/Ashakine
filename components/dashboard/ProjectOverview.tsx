"use client";

import ProjectOverviewCard from "./ProjectOverviewCard";

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

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-2">
        {projects.map((project) => (
          <ProjectOverviewCard key={project._id} project={project} />
        ))}{" "}
      </div>
    </div>
  );
};

export default ProjectOverview;
