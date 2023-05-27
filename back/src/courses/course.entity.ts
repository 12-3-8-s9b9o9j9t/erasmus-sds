import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../comments/comment.entity";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    ECTS: number;

    @Column()
    semester: string;

    @Column()
    ECTScard: string;

    @Column()
    faculties: string;

    @OneToMany(() => Comment, (comment) => comment.course)
    comments: Comment[];

    @Column("int", { array: true })
    ratings: number[];

    @Column("int", { array: true })
    ratedBy: number[];
}
