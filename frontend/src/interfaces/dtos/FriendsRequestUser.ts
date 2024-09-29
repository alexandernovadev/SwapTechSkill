export interface FriendsRequestUser {
  id:            number;
  status:        string;
  message:       string;
  createdAt:     Date;
  responseAt:    null;
  sender:        Receiver;
  receiver:      Receiver;
  skillSender:   SkillSender;
  skillReceiver: null;
}

export interface Receiver {
  id:                number;
  firstName:         string;
  lastName:          string;
  location:          null | string;
  labelProfile:      null | string;
  email:             string;
  passwordHash:      string;
  profilePictureUrl: string;
  bio:               null;
  authProvider:      null;
  authProviderId:    null;
}

export interface SkillSender {
  id:        number;
  skillName: string;
}
