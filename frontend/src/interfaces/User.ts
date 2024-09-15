export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  location?: string;
  labelProfile?: string;
  email?: string;
  passwordHash?: string;
  profilePictureUrl?: null;
  bio?: string;
  authProvider?: string;
  authProviderId?: string;
  userRoles?: UserRole[];
  userLanguages?: UserLanguage[];
  userSkills?: UserSkill[];
  userProfessionalStudies?: UserProfessionalStudy[];
}

export interface UserResponse extends Omit<User, 'passwordHash'> {}


export interface UserLanguage {
  id?: number;
  proficiencyLevel?: string;
  yearsOfExperience?: number;
  language?: Language;
  skill?: Skill;
}

export interface Language {
  id?: number;
  languageName?: string;
}

export interface Skill {
  id?: number;
  skillName?: string;
}

export interface UserProfessionalStudy {
  study_id?: number;
  degree?: string;
  institution?: string;
  start_date?: Date;
  end_date?: Date;
  description?: string;
  level_study?: null;
  state?: null;
}

export interface UserRole {
  id?: number;
  role?: Role;
}

export interface Role {
  id?: number;
  roleName?: string;
}

export interface UserSkill {
  id?: number;
  proficiencyLevel?: string;
  yearsOfExperience?: number;
  skill?: Skill;
}

export interface Skill {
  id?: number;
  skillName?: string;
}
