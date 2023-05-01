import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private repository: Repository<Comment>,
    ) { }

    async getAll(): Promise<Comment[]> {
        return await this.repository.find();
    }
    
    async getAllByCourse(courseId: number): Promise<Comment[]> {
        return await this.repository.find({ where: { courseId: Equal(courseId) } });
    }

    async get(id: number): Promise<Comment> {
        return await this.repository.findOne({ where: { id: Equal(id) } });
    }

    async create(courseId: number, userId: number, text: string, date: Date): Promise<Comment> {
        const comment = this.repository.create({ courseId, userId, text, date, modified: false, lastModified: date });
        return await this.repository.save(comment);
    }

    async update(id: number, text: string, date: Date): Promise<Comment> {
        let comment = await this.get(id);
        comment.text = text;
        comment.modified = true;
        comment.lastModified = date;
        return await this.repository.save(comment);
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.repository.delete(id);
        return res.affected > 0;
    }
}
