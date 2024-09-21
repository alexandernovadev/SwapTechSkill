import { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Importa socket.io-client
import LogoNotification from "../../assets/icons/NotificationBlack.svg";
import infoCircle from "../../assets/icons/infoCircle.svg";
import Notificacion from "../atoms/Notificacion";
import { useUIConfigStore } from "../../state/uiConfig";

const socket = io("http://localhost:3000"); // Conexión al servidor de sockets

export const Notifications = () => {
  const [socketMessage, setSocketMessage] = useState<string | null>(null);
  const { showNotification } = useUIConfigStore();

  const handleClick = () => {
    showNotification("Notificación", "Se rechaza exitosamente la solicitud de conexión.");
  };

  useEffect(() => {
    // Evento cuando el socket se conecta
    socket.on("connect", () => {
      console.log("Conectado al servidor de sockets");
    });

    // Escuchar evento 'mensaje-from-server'
    socket.on("mensaje-from-server", (data: string) => {
      console.log("Mensaje del servidor:", data);
      setSocketMessage(data);
    });

    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("mensaje-from-server");
    };
  }, []);

  // Función para enviar un mensaje al servidor
  const sendMessage = () => {
    const message = "Hola desde el frontend";
    socket.emit("mensaje-to-server", message);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-2 animate__animated animate__fadeIn animate__faster">
      <section className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-4xl font-semibold text-center mb-4">
          Notificaciones
          <img
            src={LogoNotification}
            alt="logo msg"
            className="w-9 h-9 mx-4 inline-block"
          />
        </h1>
        <div className="bg-black h-[2px] w-[90%]"></div>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#D9D9D9] w-full p-4 rounded-md mb-4 border border-black">
            <h2 className="text-xl font-semibold text-center">
              No tienes notificaciones
            </h2>
          </div>
        </div>
      </section>

      <h1>Solicitud de conexión</h1>
      <div className="flex items-center justify-between bg-[#D9D9D9] w-full px-4 py-2 rounded-md mb-4 border border-black">
        <div className="flex items-center">
          <img src={infoCircle} alt="Icon" className="w-9 h-9 mr-2" />
          <span className="text-2xl font-light">Microservicios en Java</span>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={sendMessage} // Enviar mensaje al servidor cuando se haga clic en el botón
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={handleClick}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Rechazar
          </button>
        </div>
      </div>

      {/* Test del socket */}
      <div className="bg-gray-100 p-4 rounded-md border border-black mt-4">
        <h2 className="text-xl font-semibold">Test de Socket.IO</h2>
        <p>
          Mensaje recibido del servidor:{" "}
          {socketMessage || "Esperando mensaje..."}
        </p>
      </div>
    </div>
  );
};
