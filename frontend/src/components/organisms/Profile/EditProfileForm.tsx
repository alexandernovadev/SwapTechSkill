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
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          className="border p-2"
        />
      </div>

      <div>
        <label>LastName:</label>
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          className="border p-2"
        />
      </div>
      <div>
        <label>Label:</label>
        <input
          type="text"
          name="labelProfile"
          value={formState.labelProfile}
          onChange={handleChange}
          className="border p-2"
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formState.location}
          onChange={handleChange}
          className="border p-2"
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="mr-2 bg-black text-white px-4 py-2 rounded-lg min-w-[180px]"
        >
          Cancel
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
