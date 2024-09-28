import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Chat } from '../../domain/entity/Chat';
import { ChatParticipant } from '../../domain/entity/ChatParticipant';
import { FriendRequest } from '../../domain/entity/FriendRequest';
import { Language } from '../../domain/entity/Language';
import { Meeting } from '../../domain/entity/Meeting';
import { MeetingParticipant } from '../../domain/entity/MeetingParticipant';
import { Message } from '../../domain/entity/Message';
import { Notification } from '../../domain/entity/Notification';
import { Role } from '../../domain/entity/Role';
import { Skill } from '../../domain/entity/Skill';
import { SkillCategory } from '../../domain/entity/SkillCategories';
import { User } from '../../domain/entity/User';
import { UserLanguage } from '../../domain/entity/UserLanguage';
import { UserRating } from '../../domain/entity/UserRating';
import { UserRole } from '../../domain/entity/UserRole';
import { UserSkill } from '../../domain/entity/UserSkill';
import { UserProfessionalStudy } from '../../domain/entity/UserProfessionalStudy';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_DATABASE || 'test',
  synchronize: false,
  logging: false,
  entities: [
    Chat,
    ChatParticipant,
    FriendRequest,
    Language,
    Meeting,
    MeetingParticipant,
    Message,
    Notification,
    Role,
    Skill,
    SkillCategory,
    User,
    UserLanguage,
    UserRating,
    UserRole,
    UserSkill,
    UserProfessionalStudy,
  ],
  migrations: ['src/infrastructure/persistence/migration/*.ts'],
  subscribers: [],
});
