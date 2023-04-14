import { Course } from "../courses/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, (course) => course.comments, { onDelete: 'CASCADE' })
    course: Course;

    @Column()
    text: string;

    @Column()
    author: string;

    @Column()
    date: Date;
        
} 