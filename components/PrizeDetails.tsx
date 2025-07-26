import { Vendor } from "@/types";

const PrizeDetails = ({ prizes }: { prizes: Vendor['prizes'] }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-serif">Vendor Prizes</h2>
    {prizes?.length === 0 ? (
      <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
        <p className="text-gray-500 text-base font-medium">No prizes available</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto">
        {prizes?.map((prize) => (
          <div
            key={prize._id}
            className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold text-gray-900 font-sans">
                Prize: <span className="text-blue-600">{prize.prize}</span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Max Wins: <span className="text-gray-900">{prize.maxWins}</span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Redeem Info: <span className="text-gray-900">{prize.redeemInfo}</span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Win Count: <span className="text-gray-900">{prize.winCount}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


export default PrizeDetails