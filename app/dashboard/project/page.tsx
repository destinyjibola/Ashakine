"use client";
import DynamicTable from "@/components/dashboard/Table";
import { Button } from "@/components/ui/button";
import { fetchUserData } from "@/lib/fetchUser";
import { FetchUserDataResponse } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [customData, setCustomData] = useState<FetchUserDataResponse["data"][] | null>(null);

  useEffect(() => {
    fetchUserData(setCustomData, undefined, [], "getSingleUserPost");
  }, []);

  const columns = [
    { label: "ID", accessor: "_id" },
    { label: "Title", accessor: "title" },
    { label: "Goal Amount", accessor: "goalAmount" },
    { label: "Current Amount", accessor: "currentAmount" },
    { label: "Start Date", accessor: "startdate" },
    { label: "End Date", accessor: "enddate" },
    { label: "Progress", accessor: "currentAmount" },
  ];

  return (
    <>
      <Link href={"/dashboard/project/addproject"}>
        <Button className="mb-4">Create project</Button>
      </Link>
      {customData && <DynamicTable columns={columns} data={customData} />}
    </>
  );
};

export default Page;
