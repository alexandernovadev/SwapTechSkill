import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ChatParticipant } from "./ChatParticipant";
import { Message } from "./Message";


@Entity({ name: "Chats" })
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "namechat", type: "text" })
    namechat: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToMany(() => ChatParticipant, (participant) => participant.chat)
    participants: ChatParticipant[];

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];
}
