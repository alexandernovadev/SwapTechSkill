import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import { UserLanguage, UserSkill } from "./ProfileTypes";
import { useAuthStore } from "../../state/authStore";

// Define interfaces for user data
interface UserRole {
  id: number;
  role: {
    id: number;
    roleName: string;
  };
}

interface IUserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string | null;
  bio: string | null;
  userRoles: UserRole[];
  userLanguages: UserLanguage[];
  userSkills: UserSkill[];
  userProfessionalStudies: Array<any>;
}

export const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthStore(); // Get the user object from zustand store

  // Fetch user profile data with async/await and error handling
  useEffect(() => {
    if (!user || !user.id) {
      setError("User not authenticated or ID not available.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(`/users/getById/${user.id}`);

        setUserProfile(response.data);
        setError(null); // Reset any previous errors
      } catch (err) {
        setError("Error fetching user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };

    fetchUserProfile();
  }, [user]); // Dependency array includes user to re-fetch if the user changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userProfile) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center border border-gray-300 rounded-lg p-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 mr-6">
          {/* Placeholder for Profile Picture */}
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${userProfile.firstName}-${userProfile.lastName}`}
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
          <p className="text-gray-500">
            Analista SIT Senior | Ingeniero de sistemas y computación | Técnico
            en sistemas
            <br />
            Bogotá, Distrito Capital, Colombia
          </p>
          <div className="flex items-center mt-2">
            <span className="text-black">★★★★★</span>{" "}
            {/* Example of rating stars */}
          </div>
        </div>
      </div>

      {/* Acerca de Section */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold">Acerca de...</h2>
        <p className="mt-2">
          {userProfile.bio
            ? userProfile.bio
            : "NULL : Estudiante de ingeniería de sistemas y computación, actualmente en el décimo semestre, con un sólido interés y formación en desarrollo de software y bases de datos"}
        </p>
      </div>

      {/* Estudios Profesionales Section */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold">Estudios Profesionales</h2>
        <ul className="list-disc list-inside mt-2">
          {userProfile.userProfessionalStudies &&
          userProfile.userProfessionalStudies.length > 0 ? (
            userProfile.userProfessionalStudies.map((study, index) => (
              <li key={index}>{study}</li>
            ))
          ) : (
            <>
              <li>Ingeniería de sistemas y computación</li>
              <li>Técnico en sistemas</li>
            </>
          )}
        </ul>
      </div>

      {/* Lenguajes de Programación Section */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold">Lenguajes de Programación</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {userProfile.userLanguages.map((language, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span>{language.language.languageName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Habilidades y Conocimientos Section */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold">Habilidades y Conocimientos</h2>
        <div className="space-y-2 mt-4">
          {userProfile.userSkills && userProfile.userSkills.length > 0 ? (
            userProfile.userSkills.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
              >
                <span>{skill.skill.skillName}</span>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    {/* Edit Icon */}
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    {/* Delete Icon */}
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span>Análisis de datos Python</span>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span>Microservicios Java</span>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span>Bases de Datos SQL y NoSQL</span>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span>Arquitectura de Software</span>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          + Agregar Habilidad
        </button>
      </div>
    </div>
  );
};

export default Profile;
