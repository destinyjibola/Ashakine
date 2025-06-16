import { useState } from "react";
import { Spinner } from "./Spinner";

export const PrizeForm = ({
  onSubmit,
  loading,
  initialPrize = "",
  initialMaxWins = 1,
  initialRedeemInfo = "",
  onCancel,
  isEditing = false,
}: {
  onSubmit: (data: {
    prize: string;
    maxWins: number;
    redeemInfo: string;
  }) => void;
  loading: boolean;
  initialPrize?: string;
  initialMaxWins?: number;
  initialRedeemInfo?: string;
  onCancel?: () => void;
  isEditing?: boolean;
}) => {
  const [prize, setPrize] = useState(initialPrize);
  const [maxWins, setMaxWins] = useState(initialMaxWins);
  const [redeemInfo, setRedeemInfo] = useState(initialRedeemInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ prize, maxWins, redeemInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-gray-300 text-sm block mb-1">
            Prize Name
          </label>
          <input
            type="text"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="text-gray-300 text-sm block mb-1">
            Max Wins
          </label>
          <input
            type="number"
            value={maxWins}
            onChange={(e) => setMaxWins(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>
      </div>
      <div>
        <label className="text-gray-300 text-sm block mb-1">
          Redeem Info
        </label>
        <textarea
          value={redeemInfo}
          onChange={(e) => setRedeemInfo(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          rows={3}
        />
      </div>
      <div className="flex gap-2 justify-end">
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading && (
            <Spinner />
          )}
          {isEditing ? "Save Changes" : "Add Prize"}
        </button>
      </div>
    </form>
  );
};