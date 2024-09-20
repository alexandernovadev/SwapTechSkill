import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axiosInstance from "../../services/api";
import { UserLanguage, UserSkill } from "./ProfileTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../interfaces/User";
import UserLogoDefault from "../../assets/User.png";
import Infomenu from "../../assets/icons/infomenu.svg";
import { getImageLanguagedevrepo } from "../../utils/getImageLanguagedevrepo";
import { ModalProfile } from "../organisms/ModalProfile";

// Define interfaces for user data

export const UserProfile: React.FC = () => {
  const { id } = useParams(); // Extract id from URL
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isOpenModalInfo, setIsOpenModalInfo] = useState<boolean>(false);
  const [activeSkill, setActiveSkill] = useState<UserSkill>();

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
    <div className="max-w-5xl mx-auto px-6 animate__animated animate__fadeIn animate__faster">
      {/* Btn return back */}
      <div className="sticky top-0 z-10 mb-2">
        {" "}
        {/* Make the button sticky */}
        <button
          onClick={() => window.history.back()}
          className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex items-center border border-[#1E2126] rounded-sm p-6 mb-2 relative">
        <div className="w-[225px] h-[231px] flex-shrink-0 mr-6 flex flex-row">
          <img
            src={UserLogoDefault}
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
            className=""
          />
          <div className="border-l border-black h-[90%] mx-6"></div>
        </div>
        <div className="flex-1 ml-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
              <p className="text-gray-500">
                {userProfile.labelProfile
                  ? userProfile.labelProfile
                  : "Sin Label"}
              </p>
              <p className="text-gray-500">
                {userProfile.location ? userProfile.location : "Sin Ubicación"}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-black">★★★★★</span>{" "}
                {/* Example of rating stars */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acerca de Section */}
      <div className="border border-[#1E2126] rounded-sm p-4 mb-2">
        <h2 className="text-xl font-semibold">Acerca de...</h2>
        <p className="mt-2">
          {userProfile.bio
            ? userProfile.bio
            : "NULL : Estudiante de ingeniería de sistemas y computación, actualmente en el décimo semestre, con un sólido interés y formación en desarrollo de software y bases de datos"}
        </p>
      </div>

      {/* Estudios Profesionales Section */}
      <div className="border border-[#1E2126] rounded-sm p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Estudios Profesionales</h2>
        </section>

        <ul className="space-y-4 mt-8">
          {userProfile.userProfessionalStudies &&
          userProfile.userProfessionalStudies.length > 0 ? (
            userProfile.userProfessionalStudies.map((study, index) => (
              <li key={index} className="border-l-2 pl-2 border-black">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {study.degree}
                    </h3>
                    <p className="text-xs font-medium text-blue-600">
                      {/* Cambia las fechas aquí si tienes el formato correcto */}
                      2022 - 2023
                    </p>
                    <p className="text-gray-500">{study.institution}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {study.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right"></div>
                </div>
              </li>
            ))
          ) : (
            <li>No studies available</li>
          )}
        </ul>
      </div>

      {/* Lenguajes de Programación Section */}
      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Lenguajes del Usuario</h2>
        </section>

        <div className="flex flex-row flex-wrap gap-3">
          {userProfile.userLanguages && userProfile.userLanguages.length > 0 ? (
            userProfile.userLanguages.map((language, index) => (
              <div
                key={index}
                title={`${language.yearsOfExperience} Años de experiencia en ${language.language?.languageName}`}
                className="flex flex-row justify-between items-start w-auto  cursor-pointer "
              >
                <div className="flex flex-col  items-center">
                  <div className="w-10 h-10">
                    <img
                      src={getImageLanguagedevrepo(
                        language.language?.languageName!
                      )}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://raw.githubusercontent.com/devicons/devicon/master/icons/akka/akka-original.svg";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 px-2">
                    {language.language?.languageName}
                  </h3>
                  <div className="text-[12px] rounded-2xl border border-blue-800 text-black p-1 px-2 inline-flex  mt-1">
                    {language.yearsOfExperience} años
                  </div>
                </div>
              </div>
            ))
          ) : (
            <li>No hay Lenguajes disponibles</li>
          )}
        </div>
      </div>

      {/* Skill Section */}
      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Habilidades del Usuario
          </h2>
        </section>

        <ul className="space-y-4 ">
          {userProfile.userSkills && userProfile.userSkills.length > 0 ? (
            userProfile.userSkills.map((skill, index) => (
              <li
                key={index}
                className="bg-white border border-black p-1 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 pl-3">
                    {skill.skill?.skillName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="gradient-background-azulfeo text-[16px] w-[220px] h-[33px] text-white rounded-xl px-2 py-0">
                      Conectar
                    </button>
                    <button
                      onClick={() => {
                        setIsOpenModalInfo(true);
                        setActiveSkill(skill as UserSkill);
                      }}
                    >
                      <img src={Infomenu} alt="info" className="w-10 h-10" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No hay habilidades disponibles</li>
          )}
        </ul>
      </div>
      {isOpenModalInfo && (
        <ModalProfile
          title={"Información Habilidad"}
          isOpen={isOpenModalInfo}
          onClose={() => setIsOpenModalInfo(false)}
        >
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold">
              {activeSkill?.skill?.skillName}
            </h3>
            <p className="text-gray-500">
              {activeSkill?.description
                ? activeSkill?.description
                : "Sin Descripcion"}
            </p>
            <p className="text-gray-500">
              Años de experiencia: {activeSkill?.yearsOfExperience}
            </p>
          </div>
        </ModalProfile>
      )}
    </div>
  );
};

export default UserProfile;
