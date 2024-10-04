import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars";

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  idToCalificate: number;
}

interface FormValues {
  rating: number;
  comment: string;
}

export const ModalRatingUseChat = ({
  isOpen,
  onClose,
  idToCalificate,
}: ModalProfileProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset, // <-- Añadido para poder resetear el formulario
  } = useForm<FormValues>({
    defaultValues: {
      rating: 0.5, // Establecer valor inicial a 1 en lugar de 0
    },
  });

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWithAnimation();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Función para validar que el rating sea mayor que 0
  const validateRating = (value: number) => {
    if (value && value >= 1) {
      return true; // Válido si la calificación es mayor o igual a 1
    }
    return "Debes seleccionar al menos una estrella"; // Mensaje de error si no hay calificación válida
  };

  const onSubmit = async (data: FormValues) => {
    const isRatingValid = await trigger("rating"); // Validar manualmente el campo de rating

    if (!isRatingValid) return; // No proceder si la calificación es inválida

    const rta = {
      rating: data.rating,
      comment: data.comment,
      responseAt: new Date().toISOString(),
    };

    console.log("Datos enviados:", rta);

    // Resetear el formulario después de enviarlo
    reset({ rating: 1, comment: "" }); // Establecer valores por defecto para rating y comentario

    closeWithAnimation();
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
            className={`bg-[#bfbfbf] border-2 border-[#2A49FF] p-6 rounded-2xl shadow-lg w-full max-w-md animate__animated animate-fast ${
              isClosing ? "animate__zoomOut" : "animate__zoomIn"
            }`}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <h2 className="text-center text-3xl font-bold mb-2">
                Calificar usuario
              </h2>

              <div className="bg-transparent px-4 shadow-inner flex-1 max-h-[320px] overflow-auto">
                {/* Estrellas de calificación */}
                <div className="flex justify-center mb-4">
                  <ReactStars
                    count={5}
                    size={36}
                    half={true} // Habilitar media estrella
                    value={getValues("rating")}
                    onChange={(value) => {
                      setValue("rating", value); // Actualiza la calificación
                      trigger("rating"); // Valida inmediatamente después de seleccionar la calificación
                    }}
                    color2={"#ffd700"}
                  />
                </div>
                {/* Validar el rating utilizando la función validateRating */}
                <input
                  type="hidden"
                  {...register("rating", {
                    validate: validateRating, // Usar la función validateRating para validar el rating
                  })}
                />
                {errors.rating && (
                  <p className="text-red-500 text-center">
                    {errors.rating.message}
                  </p>
                )}

                {/* Campo de texto para comentarios */}
                <textarea
                  {...register("comment", {
                    required: "El comentario es obligatorio",
                  })}
                  placeholder="Escribe un comentario..."
                  className="w-full p-2 border border-black rounded-lg bg-transparent"
                  rows={4}
                ></textarea>
                {errors.comment && (
                  <p className="text-red-500">{errors.comment.message}</p>
                )}
              </div>

              {/* Botones */}
              <div className="flex flex-row gap-2 justify-center mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-black text-white px-4 py-2 rounded-lg min-w-[150px]"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#2A49FF] to-[#000AFF] text-white px-4 py-2 rounded-lg min-w-[150px]"
                >
                  Calificar
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
