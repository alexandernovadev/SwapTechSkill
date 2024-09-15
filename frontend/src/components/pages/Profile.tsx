import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import { UserLanguage, UserSkill } from "./ProfileTypes";
import { useAuthStore } from "../../state/authStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "../../assets/icons/editbtn.svg";
import UserLogoDefault from "../../assets/User.png";
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

interface IStudy {
  id?: number;
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface IUserLanguage {
  id?: number;
  language: {
    id: number;
    languageName: string;
  };
  proficiencyLevel: string;
  yearsOfExperience: number;
}

interface ILanguage {
  id: number;
  languageName: string;
}

interface IUserSkill {
  id?: number;
  skill: {
    id: number;
    skillName: string;
  };
  proficiencyLevel: string;
  yearsOfExperience: number;
}

interface ISkill {
  id: number;
  skillName: string;
}

export const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBioModalOpen, setIsBioModalOpen] = useState<boolean>(false); // Modal state
  const [newBio, setNewBio] = useState<string>("");

  const [studyModalOpen, setStudyModalOpen] = useState<boolean>(false); // Modal state
  const [currentStudy, setCurrentStudy] = useState<IStudy | null>(null); // For edit or create

  const [languageModalOpen, setLanguageModalOpen] = useState<boolean>(false); // Modal state
  const [currentLanguage, setCurrentLanguage] = useState<IUserLanguage | null>(
    null
  );
  // For edit or create
  const [availableLanguages, setAvailableLanguages] = useState<ILanguage[]>([]);

  const [skillModalOpen, setSkillModalOpen] = useState<boolean>(false); // Modal state
  const [currentSkill, setCurrentSkill] = useState<IUserSkill | null>(null); // For edit or create
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Edit mode flag
  const [availableSkills, setAvailableSkills] = useState<ISkill[]>([]); // Available skills for selection

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

        console.log(response);

        setUserProfile(response.data);
        setError(null); // Reset any previous errors
        const responseLang = await axiosInstance.get(`/languages/getall`);
        setAvailableLanguages(responseLang.data);
        setNewBio(response.data.bio || ""); // Set the bio in the modal
        // Fetch available skills for selection
        const skillsResponse = await axiosInstance.get("/skills/getall"); // Adjust the endpoint as necessary
        setAvailableSkills(skillsResponse.data);

        console.log("User Profile Data:", response.data);
      } catch (err) {
        setError("Error fetching user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };

    fetchUserProfile();
  }, [user]); // Dependency array includes user to re-fetch if the user changes

  // Handle saving a skill (create or update)
  const handleSaveSkill = async () => {
    try {
      if (isEditMode && currentSkill && currentSkill.id) {
        // If it's edit mode, update the skill
        await axiosInstance.put(`/userskills/${currentSkill.id}`, currentSkill);
      } else {
        // If it's create mode, add a new skill
        await axiosInstance.post(`/userskills`, {
          ...currentSkill,
          user: { id: userProfile?.id },
        });
      }
      setSkillModalOpen(false);
      setCurrentSkill(null);
      setIsEditMode(false);
      // Refresh profile data
      const response = await axiosInstance.get(`/users/getById/${user!.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  // Handle deletion of a skill
  const handleDeleteSkill = async (skillId: number) => {
    try {
      await axiosInstance.delete(`/userskills/${skillId}`);
      // Refresh profile data
      const response = await axiosInstance.get(`/users/getById/${user!.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleEditBio = async () => {
    if (!userProfile) return;

    try {
      const updatedProfile = {
        ...userProfile,
        bio: newBio,
      };

      await axiosInstance.put(`/users/updateBio/${userProfile.id}`, {
        bio: newBio,
      });
      setUserProfile(updatedProfile);
      setIsBioModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  // Handle the creation of a new study or update an existing one
  const handleSaveStudy = async () => {
    try {
      if (isEditMode && currentStudy && currentStudy.id) {
        // If it's edit mode, update the study
        await axiosInstance.put(
          `/userprofesions/${currentStudy.id}`,
          currentStudy
        );
      } else {
        // If it's create mode, create a new study
        await axiosInstance.post(`/userprofesions`, {
          ...currentStudy,
          user: { id: userProfile?.id },
        });
      }
      setStudyModalOpen(false);
      setCurrentStudy(null);
      setIsEditMode(false);
      // Refresh profile data
      const response = await axiosInstance.get(`/users/getById/${user!.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error saving study:", error);
    }
  };

  // Handle deletion of a study
  const handleDeleteStudy = async (studyId: number) => {
    try {
      await axiosInstance.delete(`/userprofesions/${studyId}`);
      // Refresh profile data
      const response = await axiosInstance.get(`/users/getById/${user!.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error deleting study:", error);
    }
  };

  // Handle saving a language (create or update)
  const handleSaveLanguage = async () => {
    try {
      if (isEditMode && currentLanguage && currentLanguage.id) {
        // If it's edit mode, update the language
        await axiosInstance.put(
          `/userlanguages/${currentLanguage.id}`,
          currentLanguage
        );
      } else {
        // If it's create mode, add a new language
        await axiosInstance.post(`/userlanguages`, {
          ...currentLanguage,
          user: { id: userProfile?.id },
        });
      }
      setLanguageModalOpen(false);
      setCurrentLanguage(null);
      setIsEditMode(false);
      // Refresh profile data
      const response = await axiosInstance.get(`/users/getById/${user!.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  // Handle deletion of a language
  const handleDeleteLanguage = async (languageId: number) => {
    try {
      await axiosInstance.delete(`/userlanguages/${languageId}`);
      // Refresh profile data
      const response = await axiosInstance.get(`/users/getById/${user!.id}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

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
    <div className="max-w-5xl mx-auto p-6 animate__animated animate__fadeIn animate-so-fast">
      {/* Profile Header */}
      <div className="flex items-center  border border-[#1E2126] rounded-sm p-6 mb-2 relative">
        <div className="w-[225px] h-[231px] flex-shrink-0 mr-6 flex flex-row">
          {/* Placeholder for Profile Picture */}
          <img
            src={UserLogoDefault}
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
            className=""
          />
          <div className="border-l border-black  h-[90%] mx-6"></div>
        </div>

        <div className="flex-1 ml-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl ">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
              <p className="text-gray-500">
                Analista SIT Senior | Ingeniero de sistemas y computación |
                Técnico en sistemas
              </p>
              <p className="text-gray-500">
                Bogotá, Distrito Capital, Colombia
              </p>
              <div className="flex items-center mt-2">
                <span className="text-black">★★★★★</span>{" "}
                {/* Example of rating stars */}
              </div>
            </div>

            {/* Edit Button in the top-right corner */}
            <button
              onClick={() => setIsBioModalOpen(true)}
              className="absolute top-3 right-3"
            >
              <img src={EditBtn} className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Acerca de Section */}
      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2 relative">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold">Acerca de...</h2>
          {/* Edit Button in the top-right corner */}
          <button
            onClick={() => setIsBioModalOpen(true)}
            className="absolute top-3 right-3"
          >
            <img src={EditBtn} className="w-8 h-8" />
          </button>
        </section>
        <p className="mt-2">{userProfile.bio ? userProfile.bio : "Sin B"}</p>
      </div>

      {/* Estudios Profesionales Section */}
      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Estudios Profesionales</h2>
          <button
            onClick={() => {
              setCurrentStudy({
                degree: "",
                institution: "",
                start_date: "",
                end_date: "",
                description: "",
              });
              setIsEditMode(false);
              setStudyModalOpen(true);
            }}
            className="gradient-background-azulfeo text-white px-4 py-2 rounded-sm"
          >
            + Agregar Estudio
          </button>
        </section>

        <ul className="space-y-4">
          {userProfile.userProfessionalStudies &&
          userProfile.userProfessionalStudies.length > 0 ? (
            userProfile.userProfessionalStudies.map((study, index) => (
              <li key={index} className="bg-white p-4 shadow-sm rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {study.degree}
                    </h3>
                    <p className="text-gray-500">{study.institution}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {study.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs font-medium text-blue-600">
                      {new Date(study.start_date).toLocaleDateString()} -{" "}
                      {new Date(study.end_date).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => {
                        setCurrentStudy(study);
                        setIsEditMode(true);
                        setStudyModalOpen(true);
                      }}
                      className="text-gray-600 hover:text-gray-800 mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteStudy(study.study_id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
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
          <button
            onClick={() => {
              setCurrentLanguage({
                language: { id: 0, languageName: "" },
                proficiencyLevel: "",
                yearsOfExperience: 0,
              });
              setIsEditMode(false);
              setLanguageModalOpen(true);
            }}
            className="gradient-background-azulfeo text-white px-4 py-2 rounded-sm"
          >
            + Agregar Lenguage
          </button>
        </section>

        <ul className="space-y-4">
          {userProfile.userLanguages && userProfile.userLanguages.length > 0 ? (
            userProfile.userLanguages.map((language, index) => (
              <li key={index} className="bg-white p-4 shadow-sm rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language.language.languageName}
                    </h3>
                    <p className="text-gray-500">
                      Nivel de competencia: {language.proficiencyLevel}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Años de experiencia: {language.yearsOfExperience}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <button
                      onClick={() => {
                        setCurrentLanguage(language);
                        setIsEditMode(true);
                        setLanguageModalOpen(true);
                      }}
                      className="text-gray-600 hover:text-gray-800 mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteLanguage(language.id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No hay Lenguajes disponibles</li>
          )}
        </ul>
      </div>

      {/* Habilidades y Conocimientos Section */}
      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Habilidades del Usuario
          </h2>
          <button
            onClick={() => {
              setCurrentSkill({
                skill: { id: 0, skillName: "" },
                proficiencyLevel: "",
                yearsOfExperience: 0,
              });
              setIsEditMode(false);
              setSkillModalOpen(true);
            }}
            className="gradient-background-azulfeo text-white px-4 py-2 rounded-sm"
          >
            + Agregar Habilidad
          </button>
        </section>

        <ul className="space-y-4">
          {userProfile.userSkills && userProfile.userSkills.length > 0 ? (
            userProfile.userSkills.map((skill, index) => (
              <li key={index} className="bg-white p-4 shadow-sm rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {skill.skill.skillName}
                    </h3>
                    <p className="text-gray-500">
                      Nivel de competencia: {skill.proficiencyLevel}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Años de experiencia: {skill.yearsOfExperience}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <button
                      onClick={() => {
                        setCurrentSkill(skill);
                        setIsEditMode(true);
                        setSkillModalOpen(true);
                      }}
                      className="text-gray-600 hover:text-gray-800 mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
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

      {/* Modal for adding or editing studies */}
      {studyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-50">
          <div className="bg-[#D9D9D9] border-2 border-black p-6 rounded-2xl shadow-lg w-full max-w-md animate__animated animate__zoomIn animate-so-fast">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Editar Estudio" : "Agregar Estudio"}
            </h3>
            <div>
              <input
                type="text"
                placeholder="Degree"
                value={currentStudy?.degree || ""}
                onChange={(e) =>
                  setCurrentStudy({
                    ...currentStudy!,
                    degree: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 rounded-lg bg-transparent border border-black"
              />
              <input
                type="text"
                placeholder="Institution"
                value={currentStudy?.institution || ""}
                onChange={(e) =>
                  setCurrentStudy({
                    ...currentStudy!,
                    institution: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
              <input
                type="date"
                value={currentStudy?.start_date || ""}
                onChange={(e) =>
                  setCurrentStudy({
                    ...currentStudy!,
                    start_date: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
              <input
                type="date"
                value={currentStudy?.end_date || ""}
                onChange={(e) =>
                  setCurrentStudy({
                    ...currentStudy!,
                    end_date: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
              <textarea
                placeholder="Description"
                value={currentStudy?.description || ""}
                onChange={(e) =>
                  setCurrentStudy({
                    ...currentStudy!,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setStudyModalOpen(false)}
                className="mr-2 bg-black text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveStudy}
                className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding or editing languages */}
      {languageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-50">
          <div className="bg-[#D9D9D9] border-2 border-black p-6 rounded-2xl shadow-lg w-full max-w-md animate__animated animate__zoomIn animate-so-fast">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Editar Lenguaje" : "Agregar Lenguaje"}
            </h3>
            <div>
              <select
                value={currentLanguage?.language.id || ""}
                onChange={(e) =>
                  setCurrentLanguage({
                    ...currentLanguage!,
                    language: {
                      ...currentLanguage!.language,
                      id: parseInt(e.target.value, 10),
                      languageName:
                        availableLanguages.find(
                          (lang) => lang.id === parseInt(e.target.value, 10)
                        )?.languageName || "",
                    },
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              >
                <option value="">Seleccionar Lenguaje</option>
                {availableLanguages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.languageName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Nivel de competencia"
                value={currentLanguage?.proficiencyLevel || ""}
                onChange={(e) =>
                  setCurrentLanguage({
                    ...currentLanguage!,
                    proficiencyLevel: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
              <input
                type="number"
                placeholder="Años de experiencia"
                value={currentLanguage?.yearsOfExperience || 0}
                onChange={(e) =>
                  setCurrentLanguage({
                    ...currentLanguage!,
                    yearsOfExperience: parseInt(e.target.value, 10),
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setLanguageModalOpen(false)}
                className="mr-2 bg-black text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveLanguage}
                className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bio Modal */}
      {isBioModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-50">
          <div className="bg-[#D9D9D9] border-2 border-black p-6 rounded-2xl shadow-lg w-full max-w-md animate__animated animate__zoomIn animate-so-fast">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Editar Acerca de ...
            </h3>

            <div>
              <div className="text-[#16191C] font-light text-[13px] my-1">
                Descripción
              </div>
              <textarea
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                rows={5}
                className="w-full p-2 rounded-lg bg-transparent border border-black"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsBioModalOpen(false)}
                className="mr-2 bg-black text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Cancel
              </button>
              <button
                onClick={handleEditBio}
                className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding or editing skills */}
      {skillModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-50">
          <div className="bg-[#D9D9D9] border-2 border-black p-6 rounded-2xl shadow-lg w-full max-w-md animate__animated animate__zoomIn animate-so-fast ">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Editar Habilidad" : "Agregar Habilidad"}
            </h3>
            <div>
              <div className="text-[#16191C] font-light text-[13px] mb-1 ml-4">
                Seleccionar Habilidad
              </div>
              <select
                value={currentSkill?.skill.id || ""}
                onChange={(e) =>
                  setCurrentSkill({
                    ...currentSkill!,
                    skill: {
                      ...currentSkill!.skill,
                      id: parseInt(e.target.value, 10),
                      skillName:
                        availableSkills.find(
                          (skill) => skill.id === parseInt(e.target.value, 10)
                        )?.skillName || "",
                    },
                  })
                }
                className="w-full p-2 mb-1 border border-black rounded-lg bg-transparent"
              >
                <option value=""></option>
                {availableSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.skillName}
                  </option>
                ))}
              </select>

              <div className="text-[#16191C] font-light text-[13px] mb-1 ml-4">
                Descripcion
              </div>
              <textarea
                placeholder="Nivel de competencia"
                rows={6}
                value={currentSkill?.proficiencyLevel || ""}
                onChange={(e) =>
                  setCurrentSkill({
                    ...currentSkill!,
                    proficiencyLevel: e.target.value,
                  })
                }
                className="w-full p-2 border border-black rounded-lg bg-transparent"
              ></textarea>

              <div className="text-[#16191C] font-light text-[13px] mb-1 ml-4">
                Años de experiencia
              </div>
              <input
                type="number"
                placeholder="Escriba cuantos años de experiencia tiene  en la habilidad "
                value={currentSkill?.yearsOfExperience || 0}
                onChange={(e) =>
                  setCurrentSkill({
                    ...currentSkill!,
                    yearsOfExperience: parseInt(e.target.value, 10),
                  })
                }
                className="w-full p-2 mb-4 border border-black rounded-lg bg-transparent"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setSkillModalOpen(false)}
                className="mr-2 bg-black text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSkill}
                className="gradient-background-azulfeo text-white px-4 py-2 rounded-lg min-w-[180px]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
