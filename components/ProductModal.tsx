"use client";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { ProductFormData } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: any;
//   onSubmit: SubmitHandler<ProductFormData>;
  productLoading: boolean;
  isFormValid: boolean;
  children: React.ReactNode;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  productLoading,
  isFormValid,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-gray-200 w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Animated glow bar */}
        <div className="h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 animate-pulse"></div>

        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div></div>
          <button
            onClick={onClose}
            className="text-white w-8 h-8 bg-red-700 p-1 rounded-full"
          >
            X
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6">
          {children}

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex space-x-4">
            <button
              type="submit"
              disabled={productLoading || !isFormValid}
              className={`flex-1 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
                productLoading || !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
            >
              {productLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}