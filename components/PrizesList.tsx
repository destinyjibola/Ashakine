import React from "react";
import PrizeItem from "./PrizeItem";
import { Event, Vendor } from "@/types";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded-md ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

const PrizesList = ({
  event,
  currentPrizes,
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
  currentPage,
  totalPages,
  setCurrentPage,
  vendors,
}: {
  event: Event | null;
  currentPrizes: (Event["prizes"][0] & { vendor?: string })[];
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
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  vendors: Vendor[];
}) => (
  <>
    {!event ? (
      <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
        <p className="text-gray-500">Loading event...</p>
      </div>
    ) : currentPrizes.length === 0 ? (
      <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
        <p className="text-gray-500">No prizes added yet</p>
      </div>
    ) : (
      <>
        <div className="space-y-4">
          {currentPrizes.map((prize) => (
            <PrizeItem
              key={prize._id}
              prize={prize}
              editingPrizeId={editingPrizeId}
              editPrizeName={editPrizeName}
              setEditPrizeName={setEditPrizeName}
              editMaxWins={editMaxWins}
              setEditMaxWins={setEditMaxWins}
              editRedeemInfo={editRedeemInfo}
              setEditRedeemInfo={setEditRedeemInfo}
              handleEditPrize={handleEditPrize}
              handleDeletePrize={handleDeletePrize}
              setEditingPrizeId={setEditingPrizeId}
              vendors={vendors}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </>
    )}
  </>
);

export default PrizesList;
