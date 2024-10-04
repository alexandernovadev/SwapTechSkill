import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { MeetingParticipant } from "./MeetingParticipant";

@Entity({ name: "Meetings" })
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.meetingParticipants, { onDelete: "CASCADE" })
    organizer: User;

    @Column({ name: "title", length: 100 })
    title: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "start_time", type: "timestamp" })
    startTime: Date;

    @Column({ name: "end_time", type: "timestamp" })
    endTime: Date;

    @Column({ name: "zoom_link", length: 255, nullable: true })
    zoomLink: string;

    @Column({ name: "status", length: 50 })
    status: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
    @OneToMany(() => MeetingParticipant, (participant) => participant.meeting)
    participants: MeetingParticipant[];
}
