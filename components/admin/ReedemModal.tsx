
import { useState } from "react";
import Modal from "../Modal";

export const RedeemModal = ({
  isOpen,
  onClose,
  onSubmit,
  error,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  error: string | null;
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Redeem Prize</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="redeemCode"
              className="text-gray-300 text-sm block mb-1"
            >
              Redemption Code
            </label>
            <input
              type="text"
              id="redeemCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter redemption code"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {error && (
            <div className="bg-red-900/50 border border-gray-700 text-red-200 px-4 py-2 rounded-md">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Redeem
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};