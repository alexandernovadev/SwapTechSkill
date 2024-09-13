import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "UserRatings" })
export class UserRating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.givenRatings, { onDelete: "CASCADE" })
    rater: User;

    @ManyToOne(() => User, (user) => user.receivedRatings, { onDelete: "CASCADE" })
    ratee: User;

    @Column({ name: "rating", type: "int" })
    rating: number;

    @Column({ name: "comment", type: "text", nullable: true })
    comment: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
