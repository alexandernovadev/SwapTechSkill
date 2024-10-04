import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/api"; // Asumo que estás usando este para llamadas a la API
import { useAuthStore } from "../../state/authStore";

interface ModalCreateMeetingProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: number; // Necesitamos saber el chat asociado
}

interface FormValues {
  startDate: string;
  startTime: string;
  startAmPm: string;
  endDate: string;
  endTime: string;
  endAmPm: string;
  message: string;
}

export const ModalCreateMeeting = ({
  isOpen,
  onClose,
  chatId,
}: ModalCreateMeetingProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      setTimeout(() => setShowModal(false), 200);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeWithAnimation();
    }
  };

  const closeWithAnimation = () => {
    setIsClosing(true);
    onClose();
  };

  // Función para crear la reunión (POST)
  const scheduleMeeting = async (data: FormValues) => {
    const {
      startDate,
      startTime,
      startAmPm,
      endDate,
      endTime,
      endAmPm,
      message,
    } = data;

    // Convertir a formato de 24 horas
    const convertTo24Hour = (time: string, amPm: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      let hours24 = amPm === "PM" && hours !== 12 ? hours + 12 : hours;
      if (amPm === "AM" && hours === 12) {
        hours24 = 0; // Caso especial para medianoche
      }
      return `${String(hours24).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    };

    const startDateTime = `${startDate}T${convertTo24Hour(
      startTime,
      startAmPm
    )}`;
    const endDateTime = `${endDate}T${convertTo24Hour(endTime, endAmPm)}`;

    if (new Date(endDateTime) <= new Date(startDateTime)) {
      return alert(
        "La fecha/hora de finalización debe ser posterior a la de inicio."
      );
    }

    try {
      // Hacer la llamada POST para crear la reunión
      const response = await axiosInstance.post("/meets", {
        title: "Reunión generada desde el chat", // Puedes permitir al usuario editar el título si es necesario
        description: message,
        startTime: startDateTime,
        endTime: endDateTime,
        status: "active", // Ajusta esto si es necesario
        organizer: { id: user?.id }, // El ID del organizador, este debería obtenerse de tu estado de usuario (useAuthStore probablemente)
        chat: { id: chatId }, // Chat al que la reunión está asociada
      });

      if (response.status === 201) {
        alert("Reunión creada con éxito");
        onClose(); // Cerrar modal después de crear
      }
    } catch (error) {
      console.error("Error al crear la reunión", error);
      alert("Error al crear la reunión");
    }
  };

  const modalContent = (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-10 animate-fast ${
            isClosing ? "animate__fadeOut" : "animate__fadeIn"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-[#bfbfbf] border-2 border-[#2A49FF] p-6 rounded-2xl shadow-lg w-full max-w-[620px] animate__animated animate-fast ${
              isClosing ? "animate__zoomOut" : "animate__zoomIn"
            }`}
          >
            <form onSubmit={handleSubmit(scheduleMeeting)}>
              <h2 className="text-center text-3xl font-bold mb-4">
                Agendar Reunión
              </h2>

              {/* Grid layout */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Start Date */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha inicial
                  </label>
                  <input
                    type="date"
                    {...register("startDate", {
                      required: "La fecha inicial es requerida.",
                    })}
                    className={`shadow appearance-none border border-black bg-transparent rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.startDate ? "border-red-500" : ""
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-400 text-xs italic mt-2">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                {/* Start Time */}
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Hora inicial
                    </label>
                    <input
                      type="time"
                      {...register("startTime", {
                        required: "La hora inicial es requerida.",
                      })}
                      className={`shadow appearance-none border border-black bg-transparent rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.startTime ? "border-red-500" : ""
                      }`}
                    />
                    {errors.startTime && (
                      <p className="text-red-400 text-xs italic mt-2">
                        {errors.startTime.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha final
                  </label>
                  <input
                    type="date"
                    {...register("endDate", {
                      required: "La fecha final es requerida.",
                    })}
                    className={`shadow appearance-none border border-black bg-transparent rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.endDate ? "border-red-500" : ""
                    }`}
                  />
                  {errors.endDate && (
                    <p className="text-red-400 text-xs italic mt-2">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>

                {/* End Time */}
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Hora final
                    </label>
                    <input
                      type="time"
                      {...register("endTime", {
                        required: "La hora final es requerida.",
                      })}
                      className={`shadow appearance-none border border-black bg-transparent rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.endTime ? "border-red-500" : ""
                      }`}
                    />
                    {errors.endTime && (
                      <p className="text-red-400 text-xs italic mt-2">
                        {errors.endTime.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Escribe un mensaje
                </label>
                <textarea
                  {...register("message")}
                  rows={6}
                  className="shadow appearance-none border border-black bg-transparent rounded-xl w-full min-w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Escribe un mensaje (opcional)"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-row gap-2 justify-center mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-black text-white px-4 py-2 rounded-lg min-w-[150px]"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#2A49FF] to-[#000AFF] text-white px-4 py-2 rounded-lg min-w-[150px]"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modalPortal") as HTMLElement
  );
};
