import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";

// Define interfaces for the user and profile data
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ProfileData extends User {
  profilePictureUrl?: string | null;
  bio?: string | null;
  userRoles?: Array<{
    id: number;
    role: {
      id: number;
      roleName: string;
    };
  }>;
  userSkills?: Array<{
    id: number;
    proficiencyLevel: string;
    yearsOfExperience: number;
    skill: {
      id: number;
      skillName: string;
    };
  }>;
  userLanguages?: Array<{
    id: number;
    proficiencyLevel: string;
    yearsOfExperience: number;
    language: {
      id: number;
      languageName: string;
    };
  }>;
}

// Define props for the Search component
interface SearchProps {
  user: User | null;
}

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Valor por defecto "a"
  const [users, setUsers] = useState<User[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/users/searchByJustWordAllData`,
        {
          params: { keyword: searchTerm },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching for users", error);
    }
  };

  // Cada vez que el usuario escriba algo en el input, actualizamos el searchTerm y la URL
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Actualiza la URL dinámicamente sin recargar la página
    window.history.pushState({}, "", `/dash/search?keyword=${newSearchTerm}`);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const keyword = query.get("keyword");

    // Si no hay keyword en la URL, se usa "a" como valor por defecto
    if (keyword) {
      setSearchTerm(keyword);
    } else {
      setSearchTerm("");
      window.history.pushState({}, "", `/dash/search?keyword=`); // Actualiza la URL si está vacía
    }

    // Ejecuta la búsqueda automáticamente cuando cargue la página
    handleSearch();
  }, [searchTerm]); // Se ejecutará siempre que cambie searchTerm

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Búsqueda</h1>
      <form
        className="flex justify-center mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange} // Actualiza el searchTerm y la URL
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
          placeholder="Java"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Buscar
        </button>
      </form>

      {profileData && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold">Perfil</h2>
          <p>
            {profileData.firstName} {profileData.lastName}
          </p>
          <p>{profileData.email}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-gray-300 rounded-lg p-4 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}-${user.lastName}`}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex justify-center mb-4">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <Link
              to={`/dash/user/${user.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Detalle...
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
