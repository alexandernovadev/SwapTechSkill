import LogoChats from "../../assets/icons/msgBlack.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import SendIcon from "../../assets/icons/send.svg";
import Chatbubbles from "../../assets/icons/chatbubbles-sharp.svg";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../../state/authStore";
import { Message, useChatStore } from "../../state/useChatStore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSocketStore from "../../state/useSocketStore";
import { ModalCreateMeeting } from "../organisms/ModalCreateMeeting";

/**
 * back 
 *    5 - enviar mensaje a todos los participantes del chat
      io.to(`chat-${chatId}`).emit('new-message', save);
 */
interface FormData {
  message: string;
}

// TODO : Validate if chat exists and user is part of it
export default function Chat() {
  // get id from url ith useParams
  const { id: chatID } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { messages, fetchMessagesByChatId, saveMessage } = useChatStore();
  const { socket } = useSocketStore();
  const [isOpenModalCreateMeeting, setIsOpenModalCreateMeeting] =
    useState(false);

  // Ref para hacer scroll hasta el final
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Función para hacer scroll hacia abajo
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Desplazar hacia el final cuando los mensajes cambian
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { register, handleSubmit, reset } = useForm<FormData>();

  // Cargar los mensajes al montar el componente
  useEffect(() => {
    if (chatID) fetchMessagesByChatId(+chatID);
  }, [chatID]);

  // Unirse a la sala del chat y escuchar los mensajes
  useEffect(() => {
    if (chatID && socket) {
      socket.emit("join-chat", { chatId: chatID, userId: user?.id });

      // Escuchar mensajes nuevos enviados a la sala
      socket.on("new-message", () => {
        // Actualizar los mensajes en el frontend cuando se reciba uno nuevo
        fetchMessagesByChatId(+chatID);
      });
    }

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      socket?.off("new-message");
    };
  }, [chatID, socket]);

  // Función para manejar el envío del mensaje
  const onSubmit = (data: { message: string }) => {
    // Guardar el mensaje
    const message = {
      chatId: +chatID!,
      userId: user?.id,
      content: data.message,
    } as Message;
    // Llamar al método saveMessage del store
    saveMessage(message);
    reset(); // Limpiar el campo de texto
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 animate__animated animate__fadeIn animate__faster overflow-hidden">
      {/* Encabezado */}
      <section className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-4xl font-semibold text-center mb-4">
          Chats
          <img
            src={LogoChats}
            alt="logo msg"
            className="w-9 h-9 mx-4 inline-block"
          />
        </h1>
        <div className="bg-black h-[2px] w-[90%]"></div>
      </section>

      <ModalCreateMeeting
        isOpen={isOpenModalCreateMeeting}
        onClose={() => setIsOpenModalCreateMeeting(false)}
      />
      
      {/* Contenedor del chat */}
      <div className="flex flex-col justify-between h-[84%] overflow-hidden">
        {/* Encabezado del chat */}
        <div className="flex items-center justify-center p-2 border border-gray-950 rounded-t-lg">
          <img
            src={Chatbubbles}
            alt="icono de chat"
            className="w-6 h-6 text-blue-600 mr-2"
          />
          <h2 className="text-xl font-semibold text-center">
            Análisis de datos Python
          </h2>
        </div>

        {/* Área de conversación */}
        <div className="flex-grow border border-gray-950 p-4 overflow-auto">
          {/* Mensajes */}
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message?.sender!.id! === user?.id && "justify-end"
                }`}
              >
                <div
                  className={`${
                    message?.sender!.id! === user?.id
                      ? "gradient-background-azulfeo text-white "
                      : "bg-gray-200 text-black "
                  }  px-4 py-2 rounded-lg max-w-xs`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {/* Este div es el marcador final de los mensajes */}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        {/* Input de mensaje y botones */}
        <form
          className="flex items-center p-2 bg-[#D9D9D9] border border-gray-950 rounded-b-lg"
          onSubmit={handleSubmit(onSubmit)} // Manejar el envío del formulario
        >
          <input
            autoCorrect="off"
            autoComplete="off"
            type="text"
            placeholder="Escribe un mensaje"
            className="flex-grow p-2 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500"
            {...register("message", { required: true })} // Registrar el input
          />
          <button
            type="button"
            className="mx-2"
            onClick={() => setIsOpenModalCreateMeeting(true)}
          >
            <img src={CalendarIcon} alt="calendario" className="w-6 h-6" />
          </button>
          <button type="submit" className="p-2 text-white rounded-lg">
            <img src={SendIcon} alt="send" className="w-6 h-6" />
          </button>
        </form>
      </div>

      {/* Botón de Volver (alineado a la derecha)*/}
      <div className="flex justify-end mt-4 gap-3">
        <button className="px-4 py-2 gradient-background-azulfeo text-white rounded-lg">
          Terminar Chat
        </button>
        <Link
          to={"/dash/messages"}
          className="px-4 py-2 gradient-background-azulfeo text-white rounded-lg"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
