import React from "react";
import CircularProgressBar from "./CircularProgressBar";

interface ProjectData {
  _id: string;
  title: string;
  goalAmount: number;
  currentAmount: number;
  startdate: string;
  enddate: string;
}

interface ProjectOverviewCardProps {
  project: ProjectData;
}

const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({ project }) => {
  const { title, goalAmount, currentAmount, startdate, enddate } = project;
  const progress = Math.round((currentAmount / goalAmount) * 100);

  return (
    <div 
      className="grid grid-cols-2 border-2 gap-4 cursor-pointer border-bordercolor rounded-xl shadow-lg px-5 py-5 transition-all transform hover:bg-gray-100 hover:shadow-xl hover:shadow-gray-400/50 duration-300 ease-in-out">
      <div>
        <CircularProgressBar
          progress={progress}
          size={160}
          strokeWidth={15}
          duration={1500}
        />
      </div>

      <div>
        <h2 className="paragraph-4 mb-2">{title}</h2>

        <div className="flex flex-col space-y-1">
          <div>
            <span className="paragraph-3 text-custom-gray-300">Target:</span>{" "}
            <span className="paragraph-3">${goalAmount.toLocaleString()}</span>
          </div>
          <div>
            <span className="paragraph-3 text-custom-gray-300">Donation:</span>{" "}
            <span className="paragraph-3">${currentAmount.toLocaleString()}</span>
          </div>
          <div>
            <span className="paragraph-3 text-custom-gray-300">Progress:</span>{" "}
            <span className="paragraph-3">{progress}%</span>
          </div>
          <div>
            <span className="paragraph-3 text-custom-gray-300">Start on:</span>{" "}
            <span className="paragraph-3">
              {new Date(startdate).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="paragraph-3 text-custom-gray-300">Ends on:</span>{" "}
            <span className="paragraph-3">
              {new Date(enddate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;
