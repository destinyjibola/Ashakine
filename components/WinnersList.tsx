import { Winner } from "@/types";
import React from "react";

const WinnersList = ({ winners }: { winners: Winner[] }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-gray-900">
      Winners ({winners.length})
    </h2>
    {winners.length === 0 ? (
      <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
        <p className="text-gray-500">No winners yet</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
        {winners.map((winner) => (
          <div
            key={winner._id}
            className="bg-gray-100 p-4 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200 h-full"
          >
            <div className="flex flex-col gap-2 h-full">
              <p className="font-medium text-gray-900">
                Prize: {winner.prizeId?.prize || "No prize"}
              </p>
              <p className="text-sm text-gray-500">Code: {winner.code}</p>
              <p className="text-sm text-gray-500">
                Won: {new Date(winner.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={
                    winner.redeemed ? "text-green-500" : "text-yellow-500"
                  }
                >
                  {winner.redeemed ? "Redeemed" : "Not Redeemed"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default WinnersList;
