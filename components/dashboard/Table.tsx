"use client";
import React from "react";
import { Progress } from "@/components/ui/progress"; // Importing the Shadcn Progress component

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
                className="px-4 py-2 border-b dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {col.label}
              </th>
            ))}
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
                  className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200"
                >
                  {/* Conditionally render the progress bar for the "Progress" column */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
