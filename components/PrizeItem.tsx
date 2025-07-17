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
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    {editingPrizeId === prize._id ? (
      // Edit Mode
      <form onSubmit={(e) => handleEditPrize(e, prize._id)} className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prize Name *
            </label>
            <input
              type="text"
              value={editPrizeName}
              onChange={(e) => setEditPrizeName(e.target.value)}
              placeholder="e.g. $50 Gift Card"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Wins *
            </label>
            <input
              type="number"
              value={editMaxWins}
              onChange={(e) => setEditMaxWins(Number(e.target.value))}
              placeholder="e.g. 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Redemption Instructions
          </label>
          <textarea
            value={editRedeemInfo}
            onChange={(e) => setEditRedeemInfo(e.target.value)}
            placeholder="Provide details on how to redeem this prize..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setEditingPrizeId(null)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    ) : (
      // View Mode
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">
              {prize.prize || "Unnamed Prize"}
            </h3>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">Max Wins:</span>
                <span className="font-medium">{prize.maxWins}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">Wins:</span>
                <span className="font-medium">{prize.winCount || 0}</span>
              </div>
              {prize.vendor && (
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">Vendor:</span>
                  <span className="font-medium">
                    {vendors.find((v) => v._id === prize.vendor)?.name || "Unknown"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEditingPrizeId(prize._id);
                setEditPrizeName(prize.prize);
                setEditMaxWins(prize.maxWins);
                setEditRedeemInfo(prize.redeemInfo || "");
              }}
              className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeletePrize(prize._id)}
              className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {prize.redeemInfo && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Redemption Instructions
            </h4>
            <p className="text-gray-800 whitespace-pre-line text-sm">
              {prize.redeemInfo}
            </p>
          </div>
        )}
      </div>
    )}
  </div>
);

export default PrizeItem;