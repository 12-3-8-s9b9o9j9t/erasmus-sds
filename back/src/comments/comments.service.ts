import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentGet } from './comment.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private repository: Repository<Comment>,
        private userService: UsersService,
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

    async commentToCommentGet(comment: Comment): Promise<CommentGet> {
        const commentGet: CommentGet = {
            courseId: comment.courseId,
            username: await this.userService.get(comment.userId).then(user => user.username),
            text: comment.text,
            date: comment.date,
            modified: comment.modified,
            lastModified: comment.lastModified,
            id: comment.id,
        };
        return commentGet;
    }
}
