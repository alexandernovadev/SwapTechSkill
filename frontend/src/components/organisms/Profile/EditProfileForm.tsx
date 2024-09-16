import React, { useState } from "react";
import { useProfileStore } from "../../../state/useProfileStore";

interface EditProfileFormProps {
  onClose: () => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  onClose,
}) => {
  const { userProfile, updateProfile } = useProfileStore();
  const [formState, setFormState] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    labelProfile: userProfile?.labelProfile || "",
    location: userProfile?.location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formState);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo de Nombre */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">Nombre</div>
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
      </div>

      {/* Campo de Apellido */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">
          Apellido
        </div>
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
      </div>

      {/* Campo de Etiqueta */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">Label</div>
        <input
          type="text"
          name="labelProfile"
          value={formState.labelProfile}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
      </div>

      {/* Campo de Ubicación */}
      <div className="mb-4">
        <div className="text-[#16191C] font-light text-[13px] my-1">
          Ubicación
        </div>
        <input
          type="text"
          name="location"
          value={formState.location}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-transparent border border-black"
        />
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
          onClick={handleSubmit}
          className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg min-w-[180px]"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
