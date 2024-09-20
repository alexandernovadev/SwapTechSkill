import LogoNotification from "../../assets/icons/NotificationBlack.svg";
import infoCircle from "../../assets/icons/infoCircle.svg";
import Notificacion from "../atoms/Notificacion";

export const Notifications = () => {
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

      <Notificacion />

      <h1>Solicitud de conexión</h1>
      <div className="flex items-center justify-between bg-[#D9D9D9] w-full px-4 py-2 rounded-md mb-4 border border-black">
        <div className="flex items-center">
          <img src={infoCircle} alt="Icon" className="w-9 h-9 mr-2" />
          <span className="text-2xl font-light">Microservicios en Java</span>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => {}}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};
