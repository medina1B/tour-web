import React from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const InfoModal = ({ isOpen, onClose, children }: InfoModalProps) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent click on modal content from closing it
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>
        <div className="max-h-[80vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default InfoModal;
