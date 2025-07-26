// import { Vendor } from "@/types";

// const PrizeDetails = ({ prizes }: { prizes: Vendor['prizes'] }) => (
//   <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl">
//     <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-serif">Vendor Prizes</h2>
//     {prizes?.length === 0 ? (
//       <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
//         <p className="text-gray-500 text-base font-medium">No prizes available</p>
//       </div>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto">
//         {prizes?.map((prize) => (
//           <div
//             key={prize._id}
//             className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//           >
//             <div className="flex flex-col gap-3">
//               <p className="text-lg font-bold text-gray-900 font-sans">
//                 Prize: <span className="text-blue-600">{prize.prize}</span>
//               </p>
//               <p className="text-base font-semibold text-gray-800">
//                 Max Wins: <span className="text-gray-900">{prize.maxWins}</span>
//               </p>
//               <p className="text-base font-semibold text-gray-800">
//                 Redeem Info: <span className="text-gray-900">{prize.redeemInfo}</span>
//               </p>
//               <p className="text-base font-semibold text-gray-800">
//                 Win Count: <span className="text-gray-900">{prize.winCount}</span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );


// export default PrizeDetails


import { Vendor } from "@/types";

const PrizeDetails = ({ prizes }: { prizes: Vendor['prizes'] }) => {
  const hasPrizes = prizes && prizes.length > 0;
  const prizeCount = prizes?.length ?? 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-sans">Vendor Prizes</h2>
        {hasPrizes && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {prizeCount} prize{prizeCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      {!hasPrizes ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border border-gray-200/50">
          <svg 
            className="w-12 h-12 mx-auto text-gray-400 mb-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium">No prizes available</p>
          <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto pr-2">
          {prizes.map((prize) => (
            <div
              key={prize._id}
              className="group relative bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400/50 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    <span className="text-blue-600">{prize.prize}</span>
                  </p>
                  <span className="px-2 py-1 bg-blue-600/10 text-blue-600 text-xs font-semibold rounded-full">
                    {prize.winCount} won
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Max wins: <span className="text-gray-800">{prize.maxWins}</span></span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Redeem: <span className="text-gray-800">{prize.redeemInfo}</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrizeDetails;