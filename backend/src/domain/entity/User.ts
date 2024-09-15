import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './UserRole';
import { UserLanguage } from './UserLanguage';
import { UserSkill } from './UserSkill';
import { FriendRequest } from './FriendRequest';
import { ChatParticipant } from './ChatParticipant';
import { MeetingParticipant } from './MeetingParticipant';
import { Notification } from './Notification';
import { UserRating } from './UserRating';
import { UserProfessionalStudy } from './UserProfessionalStudy';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @Column({ name: 'location', type: 'text', nullable: true })
  location: string;

  @Column({ name: 'label_profile', type: 'text', nullable: true })
  labelProfile: string;
  
  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ name: 'profile_picture_url', length: 255, nullable: true })
  profilePictureUrl: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'auth_provider', length: 50, nullable: true })
  authProvider: string;

  @Column({ name: 'auth_provider_id', length: 255, nullable: true })
  authProviderId: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  userLanguages: UserLanguage[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];

  @OneToMany(() => ChatParticipant, (chatParticipant) => chatParticipant.user)
  chatParticipants: ChatParticipant[];

  @OneToMany(
    () => MeetingParticipant,
    (meetingParticipant) => meetingParticipant.participant,
  )
  meetingParticipants: MeetingParticipant[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => UserRating, (userRating) => userRating.ratee)
  receivedRatings: UserRating[];

  @OneToMany(() => UserRating, (userRating) => userRating.rater)
  givenRatings: UserRating[];

  @OneToMany(
    () => UserProfessionalStudy,
    (userProfessionalStudy) => userProfessionalStudy.user,
  )
  userProfessionalStudies: UserProfessionalStudy[];
}
