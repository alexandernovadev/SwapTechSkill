import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity({ name: "Messages" })
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: "CASCADE" })
    chat: Chat;

    @ManyToOne(() => User, (user) => user.chatParticipants, { onDelete: "CASCADE" })
    sender: User;

    @Column({ name: "message", type: "text" })
    message: string;

    @Column({ name: "sent_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    sentAt: Date;
}
