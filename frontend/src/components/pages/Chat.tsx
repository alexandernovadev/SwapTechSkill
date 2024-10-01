import LogoChats from "../../assets/icons/msgBlack.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import SendIcon from "../../assets/icons/send.svg";
import Chatbubbles from "../../assets/icons/chatbubbles-sharp.svg";

export default function Chat() {



  
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

        {/* Área de conversación (sin scroll innecesario) */}
        <div className="flex-grow border border-gray-950 p-4">
          {/* Mensajes */}
          <div className="flex flex-col space-y-4">
            {/* Mensaje recibido */}
            <div className="flex">
              <div className="bg-gray-200 text-black px-4 py-2 rounded-lg max-w-xs">
                Bien y tu ?
              </div>
            </div>

            {/* Mensaje enviado */}
            <div className="flex justify-end">
              <div className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg max-w-xs">
                Hola, como estas?
              </div>
            </div>
          </div>
        </div>

        {/* Input de mensaje y botones */}
        <div className="flex items-center p-2 bg-[#D9D9D9] border border-gray-950 rounded-b-lg">
          <input
            type="text"
            placeholder="Escribe un mensaje"
            className="flex-grow p-2 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-500"
          />
          <button className="mx-2">
            <img src={CalendarIcon} alt="calendario" className="w-6 h-6" />
          </button>
          <button className="p-2 text-white rounded-lg">
            <img src={SendIcon} alt="send" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Botón de Volver (alineado a la derecha)*/}
      <div className="flex justify-end mt-4 gap-3">
        <button className="px-4 py-2 gradient-background-azulfeo text-white rounded-lg">
          Terminar Chat
        </button>
        <button className="px-4 py-2 gradient-background-azulfeo text-white rounded-lg">
          Volver
        </button>
      </div> 
    </div>
  );
}
