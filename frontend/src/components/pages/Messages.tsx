import LogoMsg from "../../assets/icons/msgBlack.svg";
import Chatbubbles from "../../assets/icons/chatbubbles-sharp.svg";
import { useAuthStore } from "../../state/authStore";
import { Chat, useChatStore } from "../../state/useChatStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import axiosInstance from "../../services/api";

// Formatear la fecha en español usando Luxon
const formatDateInSpanish = (dateString: string): string => {
  const date = DateTime.fromISO(dateString);
  if (!date.isValid) return "FECHA NO VÁLIDA";
  return date.setLocale("es").toFormat("MMMM d 'del' yyyy");
};

export const Messages = () => {
  const { chats, fetchChatsByUserId, error, loading } = useChatStore();
  const { user } = useAuthStore();
  const [showTooltip, setShowTooltip] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchChatsByUserId(user?.id!);
  }, []);

  // Verificar si yo soy el que envió la solicitud
  const isSender = (chat: Chat) => {
    return chat.friendRequest?.sender.id === user?.id;
  };

  // Obtener el nombre completo del remitente y receptor
  const getChatParticipants = (chat: Chat) => {
    const senderName = isSender(chat)
      ? "YO"
      : `${chat.friendRequest?.sender.firstName} ${chat.friendRequest?.sender.lastName}`;
    const receiverName = isSender(chat)
      ? `${chat.friendRequest?.receiver.firstName} ${chat.friendRequest?.receiver.lastName}`
      : "YO";
    return { senderName, receiverName };
  };

  // Mostrar/ocultar tooltip en hover del icono
  const handleMouseEnter = (chatId: number) => {
    setShowTooltip((prev) => ({ ...prev, [chatId]: true }));
  };

  const handleMouseLeave = (chatId: number) => {
    setShowTooltip((prev) => ({ ...prev, [chatId]: false }));
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-2 animate__animated animate__fadeIn animate__faster">
      <section className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-4xl font-semibold text-center mb-4">
          Chats
          <img
            src={LogoMsg}
            alt="logo msg"
            className="w-9 h-9 mx-4 inline-block"
          />
        </h1>
        <div className="bg-black h-[2px] w-[90%]"> </div>
      </section>

      <section>
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#D9D9D9] w-full px-2 py-1 cursor-pointer rounded-md mb-4 border border-black">
              <h2 className="text-xl font-semibold text-center">
                No tienes Chats
              </h2>
            </div>
          </div>
        )}

        {chats.length > 0 &&
          chats.map((chat) => {
            const { senderName, receiverName } = getChatParticipants(chat);
            const skill = isSender(chat)
              ? chat.friendRequest?.skillSender.skillName
              : chat.friendRequest?.skillReceiver.skillName;

            return (
              <div
                key={chat.id}
                className="flex flex-row items-center justify-between w-full mb-4 bg-[#D9D9D9] px-4 py-1 border border-black rounded-md"
              >
                <section className="flex flex-row items-center justify-center">
                  <div
                    className="relative flex items-center mt-2"
                    onMouseEnter={() => handleMouseEnter(chat.id)}
                    onMouseLeave={() => handleMouseLeave(chat.id)}
                  >
                    <img
                      src={Chatbubbles}
                      alt="Chatbubbles"
                      className="w-9 h-9 cursor-pointer"
                    />

                    {/* Tooltip solo visible al pasar el mouse */}
                    {showTooltip[chat.id] && (
                      <div className="absolute w-[250px] top-0 left-12 bg-white border border-black text-black text-sm p-2 rounded-md shadow-md z-10">
                        <p>
                          <strong>Remitente:</strong> {senderName}
                        </p>
                        <p>
                          <strong>Receptor:</strong> {receiverName}
                        </p>
                        <p>
                          <strong>Habilidad solicitada:</strong> {skill}
                        </p>
                        <p>
                          {/* @ts-ignore */}
                          <strong>Fecha de creación:</strong> {formatDateInSpanish(chat.createdAt)}
                        </p>
                        <p>
                          <strong>Estado:</strong> {chat.status}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mensaje que cambia según si soy el remitente o receptor */}
                  <h2 className="text-2xl font-semibold ml-4">
                    {/* {isSender(chat)
                      ? `YO solicité ${skill}`
                      : `YO recibo ${skill}`} */}
                      {skill}
                  </h2>
                </section>

                {/* Botón para abrir el chat */}
                <div className="mt-4">
                  <Link to={`/dash/chat/${chat.id}`}>
                    <button className="px-4 py-2 gradient-background-azulfeo text-white rounded-md hover:bg-blue-900">
                      Ir al chat
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
};
