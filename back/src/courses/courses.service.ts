import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Course } from './course.entity';
import { CommentsService } from '../comments/comments.service';
import { CommentGet } from '../comments/comment.input';
import { CourseGet } from './course.input';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private repository: Repository<Course>,
        private commentsService: CommentsService,
    ) { }

    async getAll(): Promise<Course[]> {
        return this.repository.find();
    }

    async get(id: number): Promise<Course> {
        return this.repository.findOne({ where: { id: Equal(id) } });
    }

    async getComments(courseId: number): Promise<CommentGet[]> {
        if (await this.get(courseId) === null) {
            return null;
        }
        const comments = await this.commentsService.getAllByCourse(courseId);
        return Promise.all(
            comments.map(async comment => await this.commentsService.commentToCommentGet(comment)),
        )
    }

    async create(name: string, description: string, ECTS: number, semester: string, ECTScard: string, faculties: string): Promise<Course> {
        const course = this.repository.create({ name, description, ECTS, semester, ECTScard, faculties, ratings: [], ratedBy: []});
        return this.repository.save(course);
    }

    async update(id: number, name: string, description: string, ECTS: number, semester: string, ECTScard: string, faculties: string): Promise<Course> {
        let course = await this.get(id);
        if (name !== undefined) {
            course.name = name;
        }
        if (description !== undefined) {
            course.description = description;
        }
        if (ECTS !== undefined) {
            course.ECTS = ECTS;
        }
        if (semester !== undefined) {
            course.semester = semester;
        }
        if (ECTScard !== undefined) {
            course.ECTScard = ECTScard;
        }
        if (faculties !== undefined) {
            course.faculties = faculties;
        }
        return this.repository.save(course);
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.repository.delete(id);
        return res.affected > 0;
    }

    async rate(id: number, rating: number, user: number): Promise<number> {
        let course = await this.get(id);
        const idx = course.ratedBy.findIndex(u => u === user);
        if (idx === -1) {
            course.ratedBy.push(user);
            course.ratings.push(rating);
        } else {
            course.ratings[idx] = rating;
        }
        await this.repository.save(course);
        return this.calculateRating(course.ratings);
    }


    async courseToCourseGet(course: Course): Promise<CourseGet> {
        const courseGet: CourseGet = {
            id: course.id,
            name: course.name,
            description: course.description,
            ECTS: course.ECTS,
            semester: course.semester,
            ECTScard: course.ECTScard,
            faculties: course.faculties,
            comments:  course.comments,
            rating: await this.calculateRating(course.ratings),
        };
        return courseGet;
    }

    async calculateRating(ratings: number[]): Promise<number> {
        if (ratings.length === 0) {
            return 2.5;
        }
        return ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }

}
