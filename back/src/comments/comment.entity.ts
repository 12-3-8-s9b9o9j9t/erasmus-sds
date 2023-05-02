import { User } from "../users/user.entity";
import { Course } from "../courses/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, (course) => course.comments, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @Column()
    courseId: number;

    @ManyToOne(() => User, (user) => user.comments, { eager: false, onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @Column()
    text: string;

    @Column()
    date: Date;

    @Column()
    modified: boolean;

    @Column()
    lastModified: Date;
        
} 