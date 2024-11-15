import DynamicTable from '@/components/dashboard/Table';
import React from 'react'


const page = () => {

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Target Amount", accessor: "targetAmount" },
    { label: "Raised Amount", accessor: "raisedAmount" },
    { label: "Progress", accessor: "progress" },
    { label: "Completion Percentage", accessor: "completionPercentage" },
  ];

  const data = [
    {
      title: "Project A",
      targetAmount: "$10,000",
      raisedAmount: "$7,500",
      progress: 75,
      completionPercentage: "75%",
    },
    {
      title: "Project B",
      targetAmount: "$20,000",
      raisedAmount: "$15,000",
      progress: 75,
      completionPercentage: "75%",
    },
    {
      title: "Project C",
      targetAmount: "$5,000",
      raisedAmount: "$4,000",
      progress: 80,
      completionPercentage: "80%",
    },
  ];
  return (
    <div>
      <DynamicTable columns={columns} data={data} />
    </div>
  )
}

export default page