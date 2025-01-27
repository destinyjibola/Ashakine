"use client";

import { useState, useEffect } from "react";
import Overview from "@/components/dashboard/Overview";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import Supporters from "@/components/dashboard/Supporters";
import dashboardOverview from "@/helpers/dashboardOverview";
import getUserDonations from "@/helpers/getUserDonations";
import getUserProjects from "@/helpers/getUserProjects";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { ProjectResponse } from "@/lib/types";


const socket = io("http://localhost:7000"); // Replace with your server URL

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

        // Retrieve user ID from cookies
        const userId = Cookies.get("user");
        if (!userId) {
          throw new Error("User ID not found in cookies.");
        }

        // Notify the server of the connected user
        socket.emit("user_connected", userId);

        // Listen for real-time dashboard updates
        socket.on("dashboardoverview", (updatedDashboard: DashboardData) => {
          console.log("Received updated dashboard data:", updatedDashboard);
          setDashboard(updatedDashboard);
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
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup on unmount
    return () => {
      socket.off("dashboardoverview");
    };
  }, []);

  const fetchDashboardData = async (userId: string): Promise<DashboardData> => {
    const response = await fetch(`/api/dashboard/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }
    return response.json();
  };

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
