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
import { getImageLanguagedevrepo } from "../../utils/getImageLanguagedevrepo";
import { ModalRating } from "../organisms/ModalRating";
import { formatDateInSpanish } from "../../helpers/formatDateSpanish";

export const Profile = () => {
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
    updateImageProfile,
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

  const [isOpeningRating, setIsOpeningRating] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(
    userProfile?.profilePictureUrl || null
  );
  console.log(userProfile);
  

  useEffect(() => {
    fetchProfile();
    fetchAvailableLanguages();
    fetchAvailableSkills();
  }, [fetchProfile, fetchAvailableLanguages, fetchAvailableSkills]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String); // Actualizamos la imagen con el Base64
      };
      reader.readAsDataURL(file); // Convertir a Base64

      // Print base64 string
      reader.onload = function () {
        console.log(reader.result);

        // Actualizar imagen de perfil
        updateImageProfile(reader.result as string);
      };
    }
  };

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
    return <div>Este perfil no existe !</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 animate__animated animate__fadeIn animate-so-fast">
      {/* Profile Header */}
      <div className="flex items-center border border-[#1E2126] rounded-sm p-6 mb-2 relative">
        <div className="w-[225px] h-[231px] flex-shrink-0 mr-6 relative">
          {/* Imagen de perfil con fallback a imagen predeterminada */}
          <div className="bg-slate-900 w-52 h-52 rounded-full">
            <img
              src={profileImage || UserLogoDefault}
              alt={`${userProfile.firstName} ${userProfile.lastName}`}
              className="w-52 h-52 rounded-full object-cover"
            />
          </div>
          {/* Botón de edición sobre la imagen */}
          <label htmlFor="upload-photo" className="absolute top-2 right-2">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-white bg-black p-2 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="upload-photo"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex-1 ml-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl">{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
              <p className="text-gray-500">
                {userProfile.labelProfile
                  ? userProfile.labelProfile
                  : "Sin Rol Profesional"}
              </p>
              <p className="text-gray-500">
                {userProfile.location ? userProfile.location : "Sin Ubicación"}
              </p>
              <div className="flex items-center mt-2">
                <span
                  className="text-black cursor-pointer"
                  onClick={() => setIsOpeningRating(true)}
                >
                  ★★★★★
                </span>{" "}
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
                      {/* @ts-ignore */}
                      {formatDateInSpanish(study.start_date)} -{" "}
                      {/* @ts-ignore */}
                      {formatDateInSpanish(study.end_date)}
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
            <li className="border-l-2 pl-2 border-black">
              Este usuario no tiene estudios registrados
            </li>
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

        <ul className="space-y-1">
          {userProfile.userLanguages && userProfile.userLanguages.length > 0 ? (
            userProfile.userLanguages.map((language, index) => (
              <li key={index} className="bg-white p-4 shadow-sm rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8">
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
                    <section className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {language.language?.languageName}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Años de experiencia: {language.yearsOfExperience}
                      </p>
                    </section>
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

      <ModalRating
        isOpen={isOpeningRating}
        onClose={() => setIsOpeningRating(false)}
      >
        <h1 className="text-3xl font-bold mb-6">Resumen de opiniones</h1>
        <div className="flex flex-row">
          {/* Título */}

          <section className="flex-1">
            <div className="">
              {/* Barras de calificación */}
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex">
                  <span className="font-bold text-2xl "> {rating}</span>
                  {/* //BARRA DE CALIFICACIÓN⁄ */}
                  <section className="flex-grow px-2">
                    <div
                      className="gradient-background-azulfeo  h-6 rounded-full my-1"
                      style={{
                        width: ` ${rating * 15}%`,
                      }}
                    ></div>
                  </section>
                </div>
              ))}
            </div>

            {/* Calificación promedio */}
            <div className="flex flex-col items-start mb-6">
              <div className="text-[90px] font-bold m-0 mr-4">3.7</div>
              <div className="flex items-center">
                <span className=" text-3xl">★★★★★</span>
              </div>
              <div className="ml-4 text-lg text-gray-600">11 opiniones</div>
            </div>
          </section>
        </div>
      </ModalRating>
    </div>
  );
};

export default Profile;
