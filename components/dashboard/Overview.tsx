import React from "react";
import OverviewCard from "./OverviewCard";
import supportIcon from "../../assets/icons/supporters.svg";
// import donationIcon from '../../assets/icons/donation.svg'; 
// import projectIcon from '../../assets/icons/project.svg'; 

// Define a type for the expected props
interface OverviewProps {
  data: {
    totalDonors: number;
    totalProjects: number;
    totalDonations: number;
  };
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const { totalDonors, totalProjects, totalDonations } = data;

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="paragraph-9 mb-4">Overview</h2>
      <div className="flex md:flex-row flex-col justify-between space-y-6 md:space-y-0">
        <OverviewCard
          iconSrc={supportIcon.src}
          title="Total Donations"
          value={`$${totalDonations.toLocaleString()}`}
        />
        <OverviewCard
          iconSrc={supportIcon.src}
          title="Total Donors"
          value={totalDonors.toLocaleString()}
        />
        <OverviewCard
          iconSrc={supportIcon.src}
          title="Ongoing Projects"
          value={totalProjects.toLocaleString()}
        />
      </div>
    </div>
  );
};

export default Overview;
