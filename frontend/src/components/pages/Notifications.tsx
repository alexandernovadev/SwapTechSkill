import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // Importa socket.io-client
import LogoNotification from "../../assets/icons/NotificationBlack.svg";
import msgBlack from "../../assets/icons/msgBlack.svg";
import infoCircle from "../../assets/icons/infoCircle.svg";
import { useUIConfigStore } from "../../state/uiConfig";
import { useFriendRequestStore } from "../../state/friendRequestStore";
import { useAuthStore } from "../../state/authStore";
import { Link } from "react-router-dom";
import { URLBACKEND } from "../../config/variables";
import { SocketContext } from "../../context/SocketContext";

const socket = io(URLBACKEND); // Conexión al servidor de sockets

enum FriendRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export const Notifications = () => {
  const { showNotification } = useUIConfigStore();
  const { socket } = useContext(SocketContext);

  const {
    fetchFriendRequestsByReceiverId,
    friendRequests,
    updateFriendRequest,
  } = useFriendRequestStore();

  const { user } = useAuthStore();

  const handleClick = () => {
    showNotification(
      "Notificación",
      "Se rechaza exitosamente la solicitud de conexión."
    );
  };

  useEffect(() => {
    fetchFriendRequestsByReceiverId(user?.id!);
    // Unirse a la sala del usuario por su ID
    if (user?.id) {
      socket?.emit("joinRoom", user.id.toString()); // Unirse a la sala con el user.id
      console.log("ME UNI A LA SALA ", user.id);
    }

    // Limpiar la sala al salir
    return () => {
      if (user?.id) {
        socket?.emit("leaveRoom", user.id); // Abandonar la sala al desmontar el componente
      }
    };
  }, [user?.id]);

  // Listen newFriendRequest
  useEffect(() => {
    socket?.on("newFriendRequest", (data) => {
      console.log("ENTEE Y REVIOCE ");
      showNotification("Nueva solicitud de amistad", data.message);
      // Puedes actualizar el estado de solicitudes de amistad aquí si lo necesitas
      fetchFriendRequestsByReceiverId(user?.id!);
    });
    // Limpia el listener cuando el componente se desmonta
    return () => {
      socket?.off("newFriendRequest");
    };
  }, [socket]);


  const confirmNotification = async (friendRequest: any) => {
    const rta = {
      status: FriendRequestStatus.ACCEPTED,
      message: friendRequest.message,
      responseAt: new Date().toISOString(),
    };

    await updateFriendRequest(friendRequest.id, rta).then(() => {
      showNotification(
        "Notificación",
        "Se acepta exitosamente la solicitud de conexión."
      );
    });
  };
  const rejectNotification = async (friendRequest: any) => {
    const rta = {
      status: FriendRequestStatus.REJECTED,
      message: friendRequest.message,
      responseAt: new Date().toISOString(),
    };

    await updateFriendRequest(friendRequest.id, rta).then(() => {
      showNotification(
        "Notificación",
        "Se rechaza exitosamente la solicitud de conexión."
      );
    });
  };

  const returnStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Solicitud pendiente";
      case "accepted":
        return "Solicitud aceptada";
      case "rejected":
        return "Solicitud rechazada";
      default:
        return "Solicitud pendiente";
    }
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

      {friendRequests && friendRequests.length === 0 && (
        <section>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#D9D9D9] w-full p-4 rounded-md mb-4 border border-black">
              <h2 className="text-xl font-semibold text-center">
                No tienes notificaciones
              </h2>
            </div>
          </div>
        </section>
      )}

      {friendRequests &&
        friendRequests.length > 0 &&
        friendRequests.map((friendRequest) => (
          <section key={friendRequest.id}>
            <h1>{returnStatus(friendRequest.status)}</h1>
            <div className="flex items-center justify-between bg-[#D9D9D9] w-full px-4 py-2 rounded-md mb-4 border border-black">
              <div className="flex items-center">
                <Link to={`/dash/user/${friendRequest.sender.id}`}>
                  <img src={infoCircle} alt="Icon" className="w-9 h-9 mr-2" />
                </Link>
                <span className="text-2xl font-light">
                  {friendRequest.message}
                </span>
              </div>
              <div className="flex space-x-2">
                {friendRequest.status === "pending" ? (
                  <>
                    <button
                      className="gradient-background-azulfeo text-white px-4 py-2 rounded-md"
                      onClick={() => confirmNotification(friendRequest)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-md"
                      onClick={() => rejectNotification(friendRequest)}
                    >
                      Rechazar
                    </button>
                  </>
                ) : friendRequest.status === "accepted" ? (
                  <>
                    <button className="bg-[#ababae] text-black px-6 py-1 rounded-lg">
                      Solicitud Aceptada
                    </button>
                    <button>
                      <img src={msgBlack} className="w-9 h-9" alt="msg" />
                    </button>
                  </>
                ) : (
                  <button className="bg-[#ababae] text-black px-6 py-1 rounded-lg">
                    Solicitud Rechazada
                  </button>
                )}
              </div>
            </div>
          </section>
        ))}

      {/* Test del socket 
      <div className="bg-gray-100 p-4 rounded-md border border-black mt-4">
        <h2 className="text-xl font-semibold">Test de Socket.IO</h2>
        <p>
          Mensaje recibido del servidor:{" "}
          {socketMessage || "Esperando mensaje..."}
        </p>
      </div>*/}
    </div>
  );
};
