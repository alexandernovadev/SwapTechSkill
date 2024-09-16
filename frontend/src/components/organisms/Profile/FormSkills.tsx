import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfileStore } from "../../../state/useProfileStore";
import { UserLanguage, Language } from "../../../interfaces/User";

interface FormSkillsProps {
  onClose: () => void;
  skillId?: number;
  isEditing?: boolean;
}

const proficiencyLevels = ["Básico", "Intermedio", "Avanzado"];
export const FormSkills: React.FC<FormSkillsProps> = ({
  onClose,
  skillId,
  isEditing = false,
}) => {
  const {
    availableLanguages,
    userProfile,
    addLanguage,
    updateLanguage,
    findLanguageById,
  } = useProfileStore();

  // Obtener el idioma si estamos editando
  const language = skillId ? findLanguageById(skillId) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<UserLanguage>>({
    defaultValues: {
      language: language?.language || { id: 0, languageName: "" },
      yearsOfExperience: language?.yearsOfExperience || 0,
      proficiencyLevel: language?.proficiencyLevel || proficiencyLevels[2],
    },
  });

  const onSubmit = async (data: Partial<UserLanguage>) => {
    const payload = {
      language: availableLanguages.find(
        (lang: Language) => lang.languageName === data.language?.languageName
      ),
      proficiencyLevel: data.proficiencyLevel,
      yearsOfExperience: data.yearsOfExperience,
      user: { id: userProfile?.id },
    };

    
    if (isEditing && language?.id) {
      await updateLanguage(language.id, payload);
    } else {
      await addLanguage(payload);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      {/* Selección de Lenguaje */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Selecciona un lenguaje
        </label>
        <select
          {...register("language.languageName", {
            required: "Selecciona un lenguaje",
          })}
          className="mt-1 block w-full border bg-transparent border-black p-2 rounded-md"
        >
          <option value="">Selecciona una opción</option>
          {availableLanguages.map((lang: Language) => (
            <option key={lang.id} value={lang.languageName}>
              {lang.languageName}
            </option>
          ))}
        </select>
        {errors.language?.languageName && (
          <p className="text-red-500">{errors.language.languageName.message}</p>
        )}
      </div>

    
      {/* Años de experiencia */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Años de experiencia
        </label>
        <input
          type="number"
          {...register("yearsOfExperience", {
            required: "Los años de experiencia son obligatorios",
            min: { value: 0, message: "Debe ser un número positivo" },
            max: { value: 70, message: "Máximo 70 años" },
          })}
          className="mt-1 block w-full border border-black bg-transparent p-2 rounded-md"
          placeholder="Ej. 2, 5, 10"
        />
        {errors.yearsOfExperience && (
          <p className="text-red-500">{errors.yearsOfExperience.message}</p>
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
