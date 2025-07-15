import { Event, Vendor } from "@/types";

const PrizeItem = ({
  prize,
  editingPrizeId,
  editPrizeName,
  setEditPrizeName,
  editMaxWins,
  setEditMaxWins,
  editRedeemInfo,
  setEditRedeemInfo,
  handleEditPrize,
  handleDeletePrize,
  setEditingPrizeId,
  vendors,
}: {
  prize: Event["prizes"][0] & { vendor?: string };
  editingPrizeId: string | null;
  editPrizeName: string;
  setEditPrizeName: (value: string) => void;
  editMaxWins: number;
  setEditMaxWins: (value: number) => void;
  editRedeemInfo: string;
  setEditRedeemInfo: (value: string) => void;
  handleEditPrize: (e: React.FormEvent, prizeId: string) => void;
  handleDeletePrize: (prizeId: string) => void;
  setEditingPrizeId: (value: string | null) => void;
  vendors: Vendor[];
}) => (
  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
    {editingPrizeId === prize._id ? (
      <form
        onSubmit={(e) => handleEditPrize(e, prize._id)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={editPrizeName}
            onChange={(e) => setEditPrizeName(e.target.value)}
            placeholder="Prize name"
            className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="number"
            value={editMaxWins}
            onChange={(e) => setEditMaxWins(Number(e.target.value))}
            placeholder="Max Wins"
            className="w-24 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingPrizeId(null)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
        <textarea
          value={editRedeemInfo}
          onChange={(e) => setEditRedeemInfo(e.target.value)}
          placeholder="Instructions for redeeming this prize"
          className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          rows={3}
        />
      </form>
    ) : (
      <>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-gray-900">
              {prize.prize || "Unnamed Prize"}
            </h3>
            <div className="flex flex-col gap-2 mt-1 text-sm">
              <span className="text-gray-500">Max Wins: {prize.maxWins}</span>
              <span className="text-gray-500">Wins: {prize.winCount || 0}</span>
              {prize.vendor && (
                <span className="text-gray-500">
                  Vendor:{" "}
                  {vendors.find((v) => v._id === prize.vendor)?.name ||
                    "Unknown"}
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
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeletePrize(prize._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
        {prize.redeemInfo && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <h4 className="text-gray-600 text-sm font-medium mb-1">
              Redeem Information:
            </h4>
            <p className="text-gray-800 whitespace-pre-line">
              {prize.redeemInfo}
            </p>
          </div>
        )}
      </>
    )}
  </div>
);

export default PrizeItem