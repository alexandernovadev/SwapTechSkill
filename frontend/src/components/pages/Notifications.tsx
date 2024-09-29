import { useEffect } from "react";
import LogoNotification from "../../assets/icons/NotificationBlack.svg";
import msgBlack from "../../assets/icons/msgBlack.svg";
import infoCircle from "../../assets/icons/infoCircle.svg";
import { useUIConfigStore } from "../../state/uiConfig";
import { useFriendRequestStore } from "../../state/friendRequestStore";
import { useAuthStore } from "../../state/authStore";
import { Link } from "react-router-dom";
import useSocketStore from "../../state/useSocketStore";
import { FriendRequestStatus } from "../../interfaces/models/FriendRequestStatus";

export const Notifications = () => {
  const { showNotification } = useUIConfigStore();
  const { user } = useAuthStore();
  const { socket } = useSocketStore();
  const {
    fetchFriendRequestsByReceiverId,
    friendRequests,
    updateFriendRequest,
  } = useFriendRequestStore();

  useEffect(() => {
    fetchFriendRequestsByReceiverId(user?.id!);
  }, []);

  // Listen newFriendRequest
  useEffect(() => {
    socket?.on("newFriendRequest", () => {
      fetchFriendRequestsByReceiverId(user?.id!);
    });
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
      case FriendRequestStatus.PENDING:
        return "Solicitud pendiente";
      case FriendRequestStatus.ACCEPTED:
        return "Solicitud aceptada";
      case FriendRequestStatus.REJECTED:
        return "Solicitud rechazada";
      case FriendRequestStatus.COMPLETED:
        return "Solicitud Completada";
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
                  {friendRequest?.skillSender?.skillName}
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
    </div>
  );
};
