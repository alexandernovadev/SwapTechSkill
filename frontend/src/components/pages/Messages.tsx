import { useEffect, useState } from "react";
import { useProfileStore } from "../../state/useProfileStore";
import { ModalProfile } from "../organisms/ModalProfile";
import { EditProfileForm } from "../organisms/Profile/EditProfileForm";

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
    <div>
      <h1 className="font-bold">Profile Information</h1>
      <div>
        <strong>Name:</strong> {userProfile.firstName} {userProfile.lastName}
      </div>
      <div>
        <strong>Label:</strong> {userProfile.labelProfile || "N/A"}
      </div>
      <div>
        <strong>Location:</strong> {userProfile.location || "N/A"}
      </div>
      <div>
        <strong>Bio:</strong> {userProfile.bio || "N/A"}
      </div>
      <button className="bg-slate-300 p-4" onClick={() => setIsModalOpen(true)}>
        Editar
      </button>

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
