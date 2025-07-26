import React from "react";
import PrizeItem from "./PrizeItem";
import { Event, Vendor } from "@/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";

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
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            currentPage === number
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-gray-700 border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
  selectedVendor,
  setSelectedVendor,
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
  selectedVendor: string | null;
  setSelectedVendor: (vendorId: string | null) => void;
}) => {
  const filteredPrizes = selectedVendor
    ? currentPrizes.filter((prize) => prize.vendor === selectedVendor)
    : currentPrizes;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Event Prizes</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {selectedVendor
                ? vendors.find((v) => v._id === selectedVendor)?.name || "Vendor"
                : "Filter by vendor"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by vendor</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedVendor(null)}>
              All vendors
            </DropdownMenuItem>
            {vendors.map((vendor) => (
              <DropdownMenuItem
                key={vendor._id}
                onClick={() => setSelectedVendor(vendor._id)}
              >
                {vendor.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {!event ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border border-gray-200/50">
          <svg 
            className="w-12 h-12 mx-auto text-gray-400 mb-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium">Loading event...</p>
        </div>
      ) : filteredPrizes.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border border-gray-200/50">
          <svg 
            className="w-12 h-12 mx-auto text-gray-400 mb-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium">
            {selectedVendor
              ? "No prizes found for this vendor"
              : "No prizes added yet"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrizes.map((prize) => (
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
    </div>
  );
};

export default PrizesList;