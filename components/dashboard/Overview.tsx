import React from 'react';
import OverviewCard from './OverviewCard';
import supportIcon from '../../assets/icons/supporters.svg';
// import donationIcon from '../../assets/icons/donation.svg'; 
// import projectIcon from '../../assets/icons/project.svg'; 

const Overview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="paragraph-9 mb-4">Overview</h2>
      <div className="flex md:flex-row flex-col justify-between space-y-6 md:space-y-0">
        <OverviewCard iconSrc={supportIcon.src} title="Total Donation" value="$15,594" />

        <OverviewCard iconSrc={supportIcon.src} title="Donors" value="350" />
        <OverviewCard iconSrc={supportIcon.src} title="Ongoing Projects" value="12" />
      </div>
    </div>
  );
};

export default Overview;
