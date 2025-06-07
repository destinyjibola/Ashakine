interface Prize {
  _id: string;
  prize: string;
  maxWins: number;
  winCount?: number;
  redeemInfo?: string;
}

interface PrizeItemProps {
  prize: Prize;
  isEditing: boolean;
  setEditingPrizeId: (value: string | null) => void;
  editPrizeName: string;
  setEditPrizeName: (value: string) => void;
  editMaxWins: number;
  setEditMaxWins: (value: number) => void;
  editRedeemInfo: string;
  setEditRedeemInfo: (value: string) => void;
  prizeLoading: boolean;
  onEditPrize: (e: React.FormEvent, prizeId: string) => void;
  onDeletePrize: (prizeId: string) => void;
}

export default function PrizeItem({
  prize,
  isEditing,
  setEditingPrizeId,
  editPrizeName,
  setEditPrizeName,
  editMaxWins,
  setEditMaxWins,
  editRedeemInfo,
  setEditRedeemInfo,
  prizeLoading,
  onEditPrize,
  onDeletePrize,
}: PrizeItemProps) {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 transition-all duration-200 hover:border-gray-600">
      {isEditing ? (
        <form onSubmit={(e) => onEditPrize(e, prize._id)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-gray-300 text-sm block mb-1">Prize Name</label>
              <input
                type="text"
                value={editPrizeName}
                onChange={(e) => setEditPrizeName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm block mb-1">Max Wins</label>
              <input
                type="number"
                value={editMaxWins}
                onChange={(e) => setEditMaxWins(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-gray-300 text-sm block mb-1">Redeem Info</label>
            <textarea
              value={editRedeemInfo}
              onChange={(e) => setEditRedeemInfo(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              rows={3}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setEditingPrizeId(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={prizeLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {prizeLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
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
                onClick={() => {
                  setEditingPrizeId(prize._id);
                  setEditPrizeName(prize.prize);
                  setEditMaxWins(prize.maxWins);
                  setEditRedeemInfo(prize.redeemInfo || "");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDeletePrize(prize._id)}
                disabled={prizeLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
          {prize.redeemInfo && (
            <div className="mt-4 bg-gray-800/50 p-3 rounded-md border border-gray-700">
              <h4 className="text-gray-300 text-sm font-medium mb-1">Redeem Information:</h4>
              <p className="text-gray-200 whitespace-pre-line">{prize.redeemInfo}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}