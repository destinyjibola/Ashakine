export const WinnerItem = ({
  winner,
}: {
  winner: {
    prize: { prize: string };
    code: string;
    createdAt: string;
    redeemed: boolean;
  };
}) => (
  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="font-medium text-white">Prize: {winner.prize.prize}</p>
        <p className="text-sm text-gray-400">Code: {winner.code}</p>
        <p className="text-sm text-gray-400">
          Won: {new Date(winner.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-400">
          Status: {winner.redeemed ? "Redeemed" : "Not Redeemed"}
        </p>
      </div>
    </div>
  </div>
);