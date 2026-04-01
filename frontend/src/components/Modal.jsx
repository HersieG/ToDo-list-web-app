import React from "react";
// components/Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
      onClick={onClose} // ✅ click outside to close
    >
      <div
        className=" rounded-box p-6 w-full max-w-md shadow-xl flex justify-center"
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
