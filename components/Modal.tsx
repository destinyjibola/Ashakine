import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: ReactNode;
  clear?: () => void; // Make it optional
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, children , clear = () => {}}) => {
  const handleCloseModal = () => {
    if (isOpen) {
      toggleModal();
      clear(); // Now safe to call
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center bg-black bg-opacity-50 transition-opacity overflow-y-auto`} // Add overflow-y-auto to make the backdrop scrollable
    >
      <div
        className="bg-white relative rounded-lg p-4 md:w-[50%] w-11/12 transition-transform transform max-h-[90vh] overflow-y-auto" // Add max-h-[90vh] and overflow-y-auto to make the modal content scrollable
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={handleCloseModal}
          className="absolute bg-red-500 right-[6px] cursor-pointer top-[6px] text-white w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          X
        </div>
        {children}
        <div className="mt-4 flex justify-end">
          {/* You can add a close button here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Modal;