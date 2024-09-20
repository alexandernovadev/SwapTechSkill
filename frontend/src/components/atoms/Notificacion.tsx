import React, { useState } from "react";

const Notificacion: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const closeNotification = () => {
    setVisible(false);
  };

  return (
    visible && (
      <div className="flex justify-between items-center bg-[#999999] border-[6px]  border-[#2a4bff] rounded-2xl px-4 py-3 shadow-lg w-[400px] fixed top-4 right-4">
        <div>
          <p className="font-bold text-black">Notificación</p>
          <p className="text-sm text-black">
            Se rechaza exitosamente la solicitud de conexión.
          </p>
        </div>
        <button
          onClick={closeNotification}
          className="text-black ml-4 focus:outline-none"
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    )
  );
};

export default Notificacion;
