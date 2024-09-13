import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity({ name: "ChatParticipants" })
export class ChatParticipant {
    @PrimaryColumn()
    chatId: number;

    @PrimaryColumn({ name: "user_id" })
    userId: number;

    @ManyToOne(() => Chat, (chat) => chat.participants, { onDelete: "CASCADE" })
    chat: Chat;

    @ManyToOne(() => User, (user) => user.chatParticipants, { onDelete: "CASCADE" })
    user: User;
}