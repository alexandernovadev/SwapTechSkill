import React, { useState, useEffect } from "react";

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const ModalProfile = ({
  isOpen,
  onClose,
  children,
  title = "Name of the modal",
}: ModalProfileProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      setTimeout(() => setShowModal(false), 200); // La duración de la animación de cierre
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      setTimeout(() => onClose(), 200); // La duración de la animación de cierre
    }
  };

  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-1 animate-fast ${
            isClosing ? "animate__fadeOut" : "animate__fadeIn"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-[#D9D9D9] border-2 border-black p-6 rounded-2xl shadow-lg w-full max-w-md animate__animated animate-fast ${
              isClosing ? "animate__zoomOut" : "animate__zoomIn"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
