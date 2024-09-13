import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "Notifications" })
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
    user: User;

    @Column({ name: "message", type: "text" })
    message: string;

    @Column({ name: "type", length: 50 })
    type: string;

    @Column({ name: "read", type: "boolean", default: false })
    read: boolean;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
