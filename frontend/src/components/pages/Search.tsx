import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../services/api";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Fetch user profile data based on the authenticated user
  // useEffect(() => {
  //   if (user && user.id) {
  //     axiosInstance
  //       .get(`/users/getById/${user.id}`)
  //       .then((response) => {
  //         setProfileData(response.data); // Store profile data in state
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching profile data:', error);
  //       });
  //   }
  // }, [user]);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/users/searchByJustWordAllData`, {
        params: { keyword: searchTerm },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching for users", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Búsqueda</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
          placeholder="Java"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Buscar
        </button>
      </div>

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
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex justify-center mb-4">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Detalle...
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
