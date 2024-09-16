import { useEffect, useState } from "react";
import { useProfileStore } from "../../state/useProfileStore";
import { ModalProfile } from "../organisms/ModalProfile";
import { EditProfileForm } from "../organisms/Profile/EditProfileForm";
import EditBtn from "../../assets/icons/editbtn.svg";
import UserLogoDefault from "../../assets/User.png";

export const Messages = () => {
  const {
    userProfile,
    availableLanguages,
    availableSkills,
    loading,
    error,
    fetchProfile,
    fetchAvailableLanguages,
    fetchAvailableSkills,
  } = useProfileStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the profile data when the component mounts
    fetchProfile();
    fetchAvailableLanguages();
    fetchAvailableSkills();
  }, [fetchProfile, fetchAvailableLanguages, fetchAvailableSkills]);

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
              onClick={() => setIsModalOpen(true)}
              className="absolute top-3 right-3"
            >
              <img src={EditBtn} className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <ModalProfile
        title="Agregar Estudio"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <EditProfileForm onClose={() => setIsModalOpen(false)} />
      </ModalProfile>

      <h2 className="font-bold">Skills</h2>
      {userProfile.userSkills && userProfile.userSkills.length > 0 ? (
        <ul>
          {userProfile.userSkills.map((skill) => (
            <li key={skill.id} className="border">
              {skill.skill?.skillName}
              <h5>{skill.proficiencyLevel} </h5>
              <h5>{skill.yearsOfExperience} </h5>
            </li>
          ))}
        </ul>
      ) : (
        <div>No skills added.</div>
      )}

      <h2 className="font-bold">Languages</h2>
      {userProfile.userLanguages && userProfile.userLanguages.length > 0 ? (
        <ul>
          {userProfile.userLanguages.map((language) => (
            <li key={language.id}>{language.language?.languageName}</li>
          ))}
        </ul>
      ) : (
        <div>No languages added.</div>
      )}

      <h2 className="font-bold">Professional Studies</h2>
      {userProfile.userProfessionalStudies &&
      userProfile.userProfessionalStudies.length > 0 ? (
        <ul>
          {userProfile.userProfessionalStudies.map((study) => (
            <li key={study.study_id} className="border ">
              {study.degree} - {study.institution}
              <h5>{study.description}</h5>
              <h5>{study.level_study}</h5>
            </li>
          ))}
        </ul>
      ) : (
        <div>No professional studies added.</div>
      )}
    </div>
  );
};

export default Messages;
