import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  clear: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, children, clear }) => {
  const handleCloseModal = () => {
    if (isOpen) {
      toggleModal();
      clear()
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center bg-black bg-opacity-50 transition-opacity`}
    >
      <div
        className="bg-white relative rounded-lg p-4 md:w-[29%] w-11/12 transition-transform transform"
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