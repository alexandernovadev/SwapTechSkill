import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Chat } from './Chat';
import { User } from './User';

@Entity({ name: 'ChatParticipants' })
@Unique(['chat', 'user'])
export class ChatParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.participants, { onDelete: 'CASCADE' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.chatParticipants, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
