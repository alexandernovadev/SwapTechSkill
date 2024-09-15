import { create } from "zustand";
import {
  UserResponse as User,
  UserSkill,
  UserLanguage,
  UserProfessionalStudy,
  Skill,
  Language,
} from "../interfaces/User"; // Asegúrate de tener tus interfaces correctas
import { useAuthStore } from "./authStore";
import axiosInstance from "../services/api";

interface ProfileState {
  userProfile: User | null;
  availableLanguages: Language[];
  availableSkills: Skill[];
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updateBio: (bio: string) => Promise<void>;
  fetchAvailableLanguages: () => Promise<void>;
  fetchAvailableSkills: () => Promise<void>;
  addSkill: (skill: Partial<UserSkill>) => Promise<void>;
  updateSkill: (
    skillId: number,
    skillData: Partial<UserSkill>
  ) => Promise<void>;
  deleteSkill: (skillId: number) => Promise<void>;
  addLanguage: (language: Partial<UserLanguage>) => Promise<void>;
  updateLanguage: (
    languageId: number,
    languageData: Partial<UserLanguage>
  ) => Promise<void>;
  deleteLanguage: (languageId: number) => Promise<void>;
  addStudy: (study: Partial<UserProfessionalStudy>) => Promise<void>;
  updateStudy: (
    studyId: number,
    studyData: Partial<UserProfessionalStudy>
  ) => Promise<void>;
  deleteStudy: (studyId: number) => Promise<void>;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  userProfile: null,
  availableLanguages: [],
  availableSkills: [],
  loading: false,
  error: null,

  // Fetch user profile
  fetchProfile: async () => {
    const { user } = useAuthStore.getState(); // Obtén el usuario autenticado
    if (!user || !user.id) {
      set({ error: "User not authenticated", loading: false });
      return;
    }
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/users/getById/${user.id}`);
      const profile = response.data;

      // Asigna valores por defecto a los arreglos que puedan ser undefined
      set({
        userProfile: {
          ...profile,
          userSkills: profile.userSkills ?? [], // Evita undefined
          userLanguages: profile.userLanguages ?? [], // Evita undefined
          userProfessionalStudies: profile.userProfessionalStudies ?? [], // Evita undefined
        },
        loading: false,
      });
    } catch (error) {
      set({ error: "Error fetching profile", loading: false });
    }
  },

  // Update profile (Name, Label, Location)
  updateProfile: async (userData: Partial<User>) => {
    const { user } = useAuthStore.getState();
    if (!user || !user.id) return;

    try {
      await axiosInstance.put(
        `/users/updateNameLabelLocation/${user.id}`,
        userData
      );
      set((state) => ({
        userProfile: { ...state.userProfile, ...userData },
      }));
    } catch (error) {
      set({ error: "Error updating profile" });
    }
  },

  // Update bio
  updateBio: async (bio: string) => {
    const { userProfile } = get();
    if (!userProfile) return;

    try {
      await axiosInstance.put(`/users/updateBio/${userProfile.id}`, { bio });
      set((state) => ({
        userProfile: { ...state.userProfile, bio },
      }));
    } catch (error) {
      set({ error: "Error updating bio" });
    }
  },

  // Fetch available languages
  fetchAvailableLanguages: async () => {
    try {
      const response = await axiosInstance.get("/languages/getall");
      set({ availableLanguages: response.data });
    } catch (error) {
      set({ error: "Error fetching languages" });
    }
  },

  // Fetch available skills
  fetchAvailableSkills: async () => {
    try {
      const response = await axiosInstance.get("/skills/getall");
      set({ availableSkills: response.data });
    } catch (error) {
      set({ error: "Error fetching skills" });
    }
  },

  // Add a new skill
  addSkill: async (skill: Partial<UserSkill>) => {
    const { userProfile } = get();
    if (!userProfile) return;

    try {
      const response = await axiosInstance.post("/userskills", {
        ...skill,
        user: { id: userProfile.id },
      });

      // Asegúrate de que `userSkills` siempre sea un arreglo
      const updatedSkills = userProfile.userSkills ?? [];
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          userSkills: [...updatedSkills, response.data],
        },
      }));
    } catch (error) {
      set({ error: "Error adding skill" });
    }
  },

  // Update an existing skill
  updateSkill: async (skillId: number, skillData: Partial<UserSkill>) => {
    try {
      await axiosInstance.put(`/userskills/${skillId}`, skillData);
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userSkills: (state.userProfile!.userSkills ?? []).map((skill) =>
            skill.id === skillId ? { ...skill, ...skillData } : skill
          ),
        },
      }));
    } catch (error) {
      set({ error: "Error updating skill" });
    }
  },

  // Delete a skill
  deleteSkill: async (skillId: number) => {
    try {
      await axiosInstance.delete(`/userskills/${skillId}`);
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userSkills: (state.userProfile!.userSkills ?? []).filter(
            (skill) => skill.id !== skillId
          ),
        },
      }));
    } catch (error) {
      set({ error: "Error deleting skill" });
    }
  },

  // Add a new language
  addLanguage: async (language: Partial<UserLanguage>) => {
    const { userProfile } = get();
    if (!userProfile) return;

    try {
      const response = await axiosInstance.post("/userlanguages", {
        ...language,
        user: { id: userProfile.id },
      });

      const updatedLanguages = userProfile.userLanguages ?? [];
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          userLanguages: [...updatedLanguages, response.data],
        },
      }));
    } catch (error) {
      set({ error: "Error adding language" });
    }
  },

  // Update an existing language
  updateLanguage: async (
    languageId: number,
    languageData: Partial<UserLanguage>
  ) => {
    try {
      await axiosInstance.put(`/userlanguages/${languageId}`, languageData);
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userLanguages: (state.userProfile!.userLanguages ?? []).map((lang) =>
            lang.id === languageId ? { ...lang, ...languageData } : lang
          ),
        },
      }));
    } catch (error) {
      set({ error: "Error updating language" });
    }
  },

  // Delete a language
  deleteLanguage: async (languageId: number) => {
    try {
      await axiosInstance.delete(`/userlanguages/${languageId}`);
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userLanguages: (state.userProfile!.userLanguages ?? []).filter(
            (lang) => lang.id !== languageId
          ),
        },
      }));
    } catch (error) {
      set({ error: "Error deleting language" });
    }
  },

  // Add a new professional study
  addStudy: async (study: Partial<UserProfessionalStudy>) => {
    const { userProfile } = get();
    if (!userProfile) return;

    try {
      const response = await axiosInstance.post("/userprofesions", {
        ...study,
        user: { id: userProfile.id },
      });

      const updatedStudies = userProfile.userProfessionalStudies ?? [];
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userProfessionalStudies: [...updatedStudies, response.data],
        },
      }));
    } catch (error) {
      set({ error: "Error adding study" });
    }
  },

  // Update an existing study
  updateStudy: async (
    studyId: number,
    studyData: Partial<UserProfessionalStudy>
  ) => {
    try {
      await axiosInstance.put(`/userprofesions/${studyId}`, studyData);
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userProfessionalStudies: (
            state.userProfile!.userProfessionalStudies ?? []
          ).map((study) =>
            study.study_id === studyId ? { ...study, ...studyData } : study
          ),
        },
      }));
    } catch (error) {
      set({ error: "Error updating study" });
    }
  },

  // Delete a professional study
  deleteStudy: async (studyId: number) => {
    try {
      await axiosInstance.delete(`/userprofesions/${studyId}`);
      set((state) => ({
        userProfile: {
          ...state.userProfile!,
          userProfessionalStudies: (
            state.userProfile!.userProfessionalStudies ?? []
          ).filter((study) => study.study_id !== studyId),
        },
      }));
    } catch (error) {
      set({ error: "Error deleting study" });
    }
  },
}));
