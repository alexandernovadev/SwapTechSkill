import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axiosInstance from "../../services/api";
import { UserLanguage, UserSkill } from "./ProfileTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

export const UserProfile: React.FC = () => {
  const { id } = useParams(); // Extract id from URL
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user profile data with async/await and error handling
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (id) {
          const response = await axiosInstance.get(`/users/getById/${id}`);
          console.log("response", response.data);

          setUserProfile(response.data);
          setError(null); // Reset any previous errors
        }
      } catch (err) {
        setError("Error fetching user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };

    fetchUserProfile();
  }, [id]);

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
      {/* Btn return back */}
      <div className="sticky top-0 z-10">
        {" "}
        {/* Make the button sticky */}
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver
        </button>
      </div>

      {/* Profile Header */}
      <div className="mt-2 flex items-center border border-gray-300 rounded-lg p-6 mb-6">
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
                <section>
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">
                      {skill.skill.skillName}
                    </h2>{" "}
                    {/* Habilidad en texto grande y negrita */}
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-md text-gray-700">
                        Proficiency:
                      </span>
                      <span className="text-lg text-gray-800 ml-2">
                        {skill.proficiencyLevel} / 100
                      </span>{" "}
                      {/* Nivel de proficiencia */}
                    </div>
                    <hr className="" />
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-block">
                      <span className="font-light text-sm">
                        Años de experiencia: {skill.yearsOfExperience}
                      </span>{" "}
                      {/* Banner para los años de experiencia */}
                    </div>
                </section>
                <div className="flex space-x-2">
                  <button className=" bg-blue-500 text-white px-2 py-1 rounded-lg">
                    Conectar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span>SIN Skills</span>
                <div className="flex space-x-2"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
