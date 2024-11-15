import React from "react";
import SupporterCard from "./SupporterCard";

const Supporters = () => {
  const projects = [
    {
      title: "Transformer repair",
      targetAmount: "$40,000",
      progressValue: 33,
      raisedAmount: 20487, // Using numerical value
      completionPercentage: 77, // Using number for completion percentage
    },
    {
      title: "Project Alpha",
      targetAmount: "$65,000",
      progressValue: 65,
      raisedAmount: 42250, // Numerical value
      completionPercentage: 65, // Number value
    },
    {
      title: "Project Beta",
      targetAmount: "$30,000",
      progressValue: 30,
      raisedAmount: 9000, // Numerical value
      completionPercentage: 30, // Number value
    },
    {
      title: "Project Gamma",
      targetAmount: "$90,000",
      progressValue: 90,
      raisedAmount: 81000, // Numerical value
      completionPercentage: 90, // Number value
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="paragraph-9 mb-4">Supported Projects</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <SupporterCard
            key={index}
            title={project.title}
            targetAmount={project.targetAmount}
            progressValue={project.progressValue}
            raisedAmount={project.raisedAmount}
            completionPercentage={project.completionPercentage}
          />
        ))}
      </div>
    </div>
  );
};

export default Supporters;
