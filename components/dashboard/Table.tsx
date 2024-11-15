"use client";
import React from "react";
import { Progress } from "@/components/ui/progress"; // Importing the Shadcn Progress component
import { Button } from "@/components/ui/button"; // Importing the Shadcn Button component

interface Column {
  label: string;
  accessor: string;
}

interface Row {
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: Row[];
}

const DynamicTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg shadow dark:border-gray-800">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-6 py-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                {col.label}
              </th>
            ))}
            {/* Adding an extra header for the "View" button column */}
            <th className="px-6 py-4 border-b dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200"
                >
                  {col.accessor === "progress" ? (
                    <div className="flex items-center">
                      <span className="mr-2">{row[col.accessor]}%</span>
                      <Progress value={Number(row[col.accessor])} className="w-24" />
                    </div>
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
              {/* Adding a new cell for the "View" button */}
              <td className="px-6 py-4">
                <Button className="bg-black text-white" onClick={() => alert(`Viewing: ${row[columns[0].accessor]}`)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
