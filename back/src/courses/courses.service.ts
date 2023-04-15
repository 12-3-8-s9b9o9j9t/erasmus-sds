import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private repository: Repository<Course>,
    ) { }

    async getAll(): Promise<Course[]> {
        return this.repository.find();
    }

    async get(id: number): Promise<Course> {
        return this.repository.findOne({ where: { id: Equal(id) } });
    }

    async create(name: string, description: string, ECTS: number, semester: string, ECTScard: string): Promise<Course> {
        const course = this.repository.create({ name, description, ECTS, semester, ECTScard });
        return this.repository.save(course);
    }

    async update(id: number, name: string, description: string, ECTS: number, semester: string, ECTScard: string): Promise<Course> {
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
        return this.repository.save(course);
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.repository.delete(id);
        return res.affected > 0;
    }

}
