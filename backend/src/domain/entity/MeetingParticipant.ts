import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Meeting } from "./Meeting";
import { User } from "./User";

@Entity({ name: "MeetingParticipants" })
export class MeetingParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Meeting, (meeting) => meeting.participants, { onDelete: "CASCADE" })
    meeting: Meeting;

    @ManyToOne(() => User, (user) => user.meetingParticipants, { onDelete: "CASCADE" })
    participant: User;

    @Column({ name: "email_sent", type: "boolean", default: false })
    emailSent: boolean;
}
