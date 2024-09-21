import React, { useEffect, useState } from "react";
import { useUIConfigStore } from "../../state/uiConfig";

const Notificacion: React.FC = () => {
  const { notification, hideNotification } = useUIConfigStore((state) => ({
    notification: state.notification,
    hideNotification: state.hideNotification,
  }));

  const { isVisible, title, subtitle } = notification;
  const [progressWidth, setProgressWidth] = useState(100); // Estado para controlar la barra de progreso

  useEffect(() => {
    if (isVisible) {
      // Resetear la barra de progreso cuando la notificación se muestra
      setProgressWidth(100);

      // Establecer un temporizador para hacer que la notificación desaparezca después de 3 segundos
      const timeout = setTimeout(() => {
        hideNotification(); // Ocultar notificación después de 3 segundos
      }, 3000);

      // Barra de progreso se va reduciendo con CSS animado
      const interval = setInterval(() => {
        setProgressWidth((prevWidth) => prevWidth - 1); // Reducir la barra cada intervalo
      }, 30); // 3000 ms / 100 pasos = 30 ms por paso

      // Limpiar el temporizador y el intervalo cuando el componente se desmonta
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [isVisible, hideNotification]);

  if (!isVisible) {
    return null; // No mostrar la notificación si no está visible
  }

  return (
    <div
      className={`flex flex-col justify-between 
    items-center z-10 bg-[#999999] border-[6px]  
    border-[#2a4bff] rounded-2xl px-4 pt-3 pb-1 shadow-lg w-[400px] 
    fixed top-4 right-4 animate__animated  animate__slideInDown animate__faster`}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="font-bold text-black">{title}</p>
          <p className="text-sm text-black">{subtitle}</p>
        </div>
        <button
          onClick={hideNotification}
          className="text-black ml-4 focus:outline-none"
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 h-[0.9px] mt-1">
        <div
          className="gradient-background-azulfeo  h-[0.8px]"
          style={{ width: `${progressWidth}%` }} // Controla la barra con el estado
        ></div>
      </div>
    </div>
  );
};

export default Notificacion;
