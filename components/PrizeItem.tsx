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
  <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-400/50 hover:shadow-md transition-all duration-300 overflow-hidden">
    {editingPrizeId === prize._id ? (
      // Edit Mode
      <form onSubmit={(e) => handleEditPrize(e, prize._id)} className="p-5 space-y-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setEditingPrizeId(null)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    ) : (
      // View Mode
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">
              {prize.prize || "Unnamed Prize"}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-full">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm font-medium text-blue-600">Max: {prize.maxWins}</span>
              </div>
              
              <div className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">Won: {prize.winCount || 0}</span>
              </div>

              {prize.vendor && (
                <div className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
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
              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
              aria-label="Edit prize"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => handleDeletePrize(prize._id)}
              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
              aria-label="Delete prize"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {prize.redeemInfo && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="text-sm font-medium">Redemption Instructions</h4>
            </div>
            <p className="text-gray-800 text-sm whitespace-pre-line">
              {prize.redeemInfo}
            </p>
          </div>
        )}
      </div>
    )}
  </div>
);

export default PrizeItem;