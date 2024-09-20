import LogoMsg from "../../assets/icons/msgBlack.svg";
import Chatbubbles from "../../assets/icons/chatbubbles-sharp.svg";
import Notificacion from "../atoms/Notificacion";

export const Messages = () => {
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

      <Notificacion />
      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#D9D9D9] w-full px-2 py-1 cursor-pointer rounded-md mb-4 border border-black">
            <h2 className="text-xl font-semibold text-center">
              No tienes Chats
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div className="bg-[#D9D9D9] w-full px-2 py-1 cursor-pointer rounded-md mb-4 border border-black">
            <h2 className="text-xl font-semibold">
              <img
                src={Chatbubbles}
                alt="Chatbubbles"
                className="w-9 h-9 mx-4 inline-block"
              />
              Análisis de datos Python
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div className="bg-[#D9D9D9] w-full px-2 py-1 cursor-pointer rounded-md mb-4 border border-black">
            <h2 className="text-xl font-semibold">
              <img
                src={Chatbubbles}
                alt="Chatbubbles"
                className="w-9 h-9 mx-4 inline-block"
              />
              Bases de Datos SQL y NoSQL
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div className="bg-[#D9D9D9] w-full px-2 py-1 cursor-pointer rounded-md mb-4 border border-black">
            <h2 className="text-xl font-semibold">
              <img
                src={Chatbubbles}
                alt="Chatbubbles"
                className="w-9 h-9 mx-4 inline-block"
              />
              Microservicios en Java
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};
