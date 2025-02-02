"use client";

import { useState, useEffect } from "react";
import Overview from "@/components/dashboard/Overview";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import Supporters from "@/components/dashboard/Supporters";
import dashboardOverview from "@/helpers/dashboardOverview";
import getUserDonations from "@/helpers/getUserDonations";
import getUserProjects from "@/helpers/getUserProjects";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { ProjectResponse } from "@/lib/types";

// Socket connection setup
const socket = io(process.env.NEXT_PUBLIC_APP_URL);

interface DashboardData {
  totalDonors: number;
  totalProjects: number;
  totalDonations: number;
}

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState<DashboardData>({
    totalDonors: 0,
    totalProjects: 0,
    totalDonations: 0,
  });
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [donations, setDonations] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userId = Cookies.get("user");
        if (!userId) {
          throw new Error("User ID not found in cookies.");
        }

        socket.emit("user_connected", userId);

        socket.on("dashboardoverview", (updatedDashboard: DashboardData) => {
          setDashboard(updatedDashboard);
        });

        socket.on("project", (project: ProjectResponse[]) => {
          setProjects(project);
        });

        socket.on("donation", (donation: ProjectResponse[]) => {
          setDonations(donation);
        });

        const [dashboardData, projectsData, donationsData] = await Promise.all([
          dashboardOverview(userId),
          getUserProjects(userId),
          getUserDonations(userId),
        ]);

        setDashboard(dashboardData.data as DashboardData);
        setProjects(projectsData.data as ProjectResponse[]);
        setDonations(donationsData.data as ProjectResponse[]);

      } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      socket.off("dashboardoverview");
      socket.off("project");
      socket.off("donation");
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-8">
      <Overview data={dashboard} />
      <ProjectOverview projects={projects} />
      <Supporters projects={donations} />
    </div>
  );
};

export default DashboardPage;
