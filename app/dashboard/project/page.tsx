"use client";
import DynamicTable from "@/components/dashboard/Table";
import React from "react";

const Page = () => {
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Target Amount", accessor: "targetAmount" },
    { label: "Donation Amount", accessor: "donationAmount" },
    { label: "Supporters", accessor: "supporters" },
    { label: "Start Date", accessor: "startDate" },
    { label: "End Date", accessor: "endDate" },
    { label: "Progress (%)", accessor: "progress" },
  ];

  const projects = [
    {
      id: "INV001",
      name: "Ade’s kidney surgery",
      targetAmount: "$5000",
      donationAmount: "$2000",
      supporters: 400,
      startDate: "11/11/2024",
      endDate: "11/12/2024",
      progress: 40,
    },
    {
      id: "INV002",
      name: "Community Health Center",
      targetAmount: "$10000",
      donationAmount: "$7500",
      supporters: 600,
      startDate: "10/01/2024",
      endDate: "10/31/2024",
      progress: 75,
    },
    {
      id: "INV003",
      name: "Emergency Relief Fund",
      targetAmount: "$8000",
      donationAmount: "$5000",
      supporters: 300,
      startDate: "09/15/2024",
      endDate: "09/30/2024",
      progress: 62.5,
    },
  ];

  return <DynamicTable columns={columns} data={projects} />;
};

export default Page;
