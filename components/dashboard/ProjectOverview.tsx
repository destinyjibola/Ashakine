"use client";

import ProjectOverviewCard from "./ProjectOverviewCard";

const ProjectOverview = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="paragraph-9 mb-4">Projects</h2>

      <div className="grid grid-cols-3 gap-2">
        <ProjectOverviewCard />
        <ProjectOverviewCard />
        <ProjectOverviewCard />
      </div>
    </div>
  );
};

export default ProjectOverview;
