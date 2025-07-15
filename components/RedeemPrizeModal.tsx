import Modal from "./Modal";

const RedeemPrizeModal = ({
  isOpen,
  onClose,
  redeemCode,
  setRedeemCode,
  redeemError,
  handleRedeemPrize,
}: {
  isOpen: boolean;
  onClose: () => void;
  redeemCode: string;
  setRedeemCode: (value: string) => void;
  redeemError: string | null;
  handleRedeemPrize: (e: React.FormEvent) => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-6 space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-900">Redeem Prize</h2>
      <form onSubmit={handleRedeemPrize} className="space-y-4">
        <div>
          <label
            htmlFor="redeemCode"
            className="text-gray-600 text-sm block mb-1"
          >
            Redemption Code
          </label>
          <input
            type="text"
            id="redeemCode"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            placeholder="Enter redemption code"
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {redeemError && (
          <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-md">
            {redeemError}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Redeem
          </button>
        </div>
      </form>
    </div>
  </Modal>
);
export default RedeemPrizeModal;
