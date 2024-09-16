import React from "react";
import { useForm } from "react-hook-form";
import { useProfileStore } from "../../../state/useProfileStore";

interface EditProfileFormProps {
  onClose: () => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  onClose,
}) => {
  const { userProfile, updateProfile } = useProfileStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      labelProfile: userProfile?.labelProfile || "",
      location: userProfile?.location || "",
    },
  });

  const onSubmit = async (data: any) => {
    await updateProfile(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo de Nombre */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">Nombre</div>
        <input
          type="text"
          {...register("firstName", { required: "El nombre es obligatorio" })}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
        {errors.firstName && (
          <p className="text-red-400 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      {/* Campo de Apellido */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">
          Apellido
        </div>
        <input
          type="text"
          {...register("lastName", { required: "El apellido es obligatorio" })}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
        {errors.lastName && (
          <p className="text-red-400 text-sm">{errors.lastName.message}</p>
        )}
      </div>

      {/* Campo de Etiqueta */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">Label</div>
        <input
          type="text"
          {...register("labelProfile", {
            required: "El banner es obligatorio",
            maxLength: 50,
          })}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
        {errors.labelProfile && (
          <p className="text-red-400 text-sm">Máximo 50 caracteres</p>
        )}
      </div>

      {/* Campo de Ubicación */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">
          Ubicación
        </div>
        <input
          type="text"
          {...register("location", { required: "La ubicación es obligatoria" })}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
        {errors.location && (
          <p className="text-red-400 text-sm">{errors.location.message}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 bg-black text-white px-4 py-2 rounded-lg min-w-[180px]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg min-w-[180px]"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
