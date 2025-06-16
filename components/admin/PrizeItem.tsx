import { useState } from "react";
import { PrizeForm } from "./PrizeForm";


export const PrizeItem = ({
  prize,
  onEdit,
  onDelete,
  loading,
}: {
  prize: {
    _id: string;
    prize: string;
    maxWins: number;
    winCount: number;
    redeemInfo?: string;
  };
  onEdit: (id: string, data: {
    prize: string;
    maxWins: number;
    redeemInfo: string;
  }) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className=   "bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <PrizeForm
          onSubmit={(data) => {
            onEdit(prize._id, data);
            setIsEditing(false);
          }}
          loading={loading}
          initialPrize={prize.prize}
          initialMaxWins={prize.maxWins}
          initialRedeemInfo={prize.redeemInfo || ""}
          onCancel={() => setIsEditing(false)}
          isEditing
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 transition-all duration-200 hover:border-gray-600">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-medium text-lg text-white">{prize.prize}</h3>
          <div className="flex gap-4 mt-1 text-sm">
            <span className="text-gray-400">Max Wins: {prize.maxWins}</span>
            <span className="text-gray-400">Wins: {prize.winCount || 0}</span>
            {prize.maxWins > 0 && (
              <span className="text-gray-400">
                Remaining: {Math.max(0, prize.maxWins - (prize.winCount || 0))}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(prize._id)}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
      {prize.redeemInfo && (
        <div className="mt-4 bg-gray-800/50 p-3 rounded-md border border-gray-700">
          <h4 className="text-gray-300 text-sm font-medium mb-1">
            Redeem Information:
          </h4>
          <p className="text-gray-200 whitespace-pre-line">{prize.redeemInfo}</p>
        </div>
      )}
    </div>
  );
};