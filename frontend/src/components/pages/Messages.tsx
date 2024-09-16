import { useEffect, useState } from "react";
import { useProfileStore } from "../../state/useProfileStore";
import { ModalProfile } from "../organisms/ModalProfile";
import { EditProfileForm } from "../organisms/Profile/EditProfileForm";
import EditBtn from "../../assets/icons/editbtn.svg";
import UserLogoDefault from "../../assets/User.png";
import { EditBioForm } from "../organisms/Profile/EditBioForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FormStudies } from "../organisms/Profile/FormStudies";
import { FormLanguages } from "../organisms/Profile/FormLanguages";
import { FormSkills } from "../organisms/Profile/FormSkills";

export const Messages = () => {
  const {
    userProfile,
    loading,
    error,
    fetchProfile,
    fetchAvailableLanguages,
    fetchAvailableSkills,
    deleteStudy,
    deleteLanguage,
    deleteSkill,
  } = useProfileStore();

  const [isModalMyDataOpen, setIsModalMyDataOpen] = useState(false);
  const [isModalMyBioOpen, setIsModalMyBioOpen] = useState(false);
  const [isModalStudiesOpen, setIsModalStudiesOpen] = useState(false);
  const [isEditingStudies, setisEditingStudies] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(0);

  const [isModalLanguagesOpen, setIsModalLanguagesOpen] = useState(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState<number>(0);

  const [isModalSkillsOpen, setIsModalSkillsOpen] = useState(false);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<number>(0);

  useEffect(() => {
    fetchProfile();
    fetchAvailableLanguages();
    fetchAvailableSkills();
  }, [fetchProfile, fetchAvailableLanguages, fetchAvailableSkills]);

  const handleEditStudy = (studyId: number) => {
    setSelectedStudy(studyId);
    setisEditingStudies(true);
    setIsModalStudiesOpen(true);
  };

  const handleDeleteStudy = async (studyId: number) => {
    await deleteStudy(studyId);
  };

  const handleDeleteLanguage = async (languageId: number) => {
    await deleteLanguage(languageId);
  };

  const handleDeleteSkill = async (skillId: number) => {
    await deleteSkill(skillId);
  };
  const handleEditSkill = (skillId: number) => {
    setIsEditingSkill(true);
    setSelectedSkillId(skillId);
    setIsModalSkillsOpen(true);
  };

  const handleEditLanguage = (languageId: number) => {
    setIsEditingLanguage(true);
    setSelectedLanguageId(languageId);
    setIsModalLanguagesOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 animate__animated animate__fadeIn animate-so-fast">
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

            {/* Edit Button in the top-right corner */}
            <button
              onClick={() => setIsModalMyDataOpen(true)}
              className="absolute top-3 right-3"
            >
              <img src={EditBtn} className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
      {/* Modal for editing profile */}
      <ModalProfile
        title="Mis Datos"
        isOpen={isModalMyDataOpen}
        onClose={() => setIsModalMyDataOpen(false)}
      >
        <EditProfileForm onClose={() => setIsModalMyDataOpen(false)} />
      </ModalProfile>

      {/* Acerca de Section */}
      <div className="border border-[#1E2126] rounded-sm p-4 mb-2 relative">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold">Acerca de...</h2>
          <button
            onClick={() => setIsModalMyBioOpen(true)}
            className="absolute top-3 right-3"
          >
            <img src={EditBtn} className="w-8 h-8" />
          </button>
        </section>
        <p className="mt-2">{userProfile.bio ? userProfile.bio : "Sin B"}</p>
      </div>
      {/* Modal for editing my bio */}
      <ModalProfile
        title="Mis Datos"
        isOpen={isModalMyBioOpen}
        onClose={() => setIsModalMyBioOpen(false)}
      >
        <EditBioForm onClose={() => setIsModalMyBioOpen(false)} />
      </ModalProfile>

      {/* Estudios Profesionales Section */}
      <div className="border border-[#1E2126] rounded-sm p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Estudios Profesionales</h2>
          <button
            onClick={() => {
              setisEditingStudies(false);
              setIsModalStudiesOpen(true);
            }}
            className="gradient-background-azulfeo text-white px-4 py-2 rounded-sm"
          >
            + Agregar Estudio
          </button>
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
                  <div className="ml-4 text-right">
                    <button
                      onClick={() => handleEditStudy(study.study_id!)}
                      className="text-gray-600 hover:text-gray-800 mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteStudy(study.study_id!)}
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
      {/* Modal for adding/editing Studies */}
      <ModalProfile
        title={isEditingStudies ? "Editando Estudio" : "Agregando Estudio"}
        isOpen={isModalStudiesOpen}
        onClose={() => setIsModalStudiesOpen(false)}
      >
        <FormStudies
          onClose={() => setIsModalStudiesOpen(false)}
          isEditing={isEditingStudies}
          studyId={selectedStudy}
        />
      </ModalProfile>

      {/* Lenguajes de Programación Section */}
      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Lenguajes del Usuario</h2>
          <button
            onClick={() => setIsModalLanguagesOpen(true)}
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
                      {language.language?.languageName}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      Años de experiencia: {language.yearsOfExperience}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <button
                      onClick={() => handleEditLanguage(language.id!)}
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

      {/* Modal para lenguajes */}
      <ModalProfile
        title={isEditingLanguage ? "Editando Languajes" : "Agregando Languajes"}
        isOpen={isModalLanguagesOpen}
        onClose={() => setIsModalLanguagesOpen(false)}
      >
        <FormLanguages
          onClose={() => setIsModalLanguagesOpen(false)}
          isEditing={isEditingLanguage}
          languageId={selectedLanguageId}
        />
      </ModalProfile>

      <div className="border border-[#1E2126] rounded-sm  p-4 mb-2">
        <section className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Habilidades del Usuario
          </h2>
          <button
            onClick={() => setIsModalSkillsOpen(true)}
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
                      {skill.skill?.skillName}
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
                      onClick={() => handleEditSkill(skill.id!)}
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
      {/* Modal para Skill */}
      <ModalProfile
        title={isEditingSkill ? "Editando Habilidad" : "Agregando Habilidad"}
        isOpen={isModalSkillsOpen}
        onClose={() => setIsModalSkillsOpen(false)}
      >
        <FormSkills
          onClose={() => setIsModalSkillsOpen(false)}
          isEditing={isEditingSkill}
          skillId={selectedSkillId}
        />
      </ModalProfile>
    </div>
  );
};

export default Messages;
