import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "FriendRequests" })
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.sentFriendRequests, { onDelete: "CASCADE" })
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedFriendRequests, { onDelete: "CASCADE" })
    receiver: User;

    @Column({ name: "status", length: 50 })
    status: string;

    @Column({ name: "message", type: "text", nullable: true })
    message: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "response_at", type: "timestamp", nullable: true })
    responseAt: Date;
}
