import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CommentInput } from './comment.input';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(
        private service: CommentsService,
    ) {}

    @Get()
    public async getAll(): Promise<Comment[]> {
        return this.service.getAll();
    }

    @Get(':id')
    public async get(@Param('id') id: number): Promise<Comment> {
        const comment = await this.service.get(id);
        if (comment === null) {
            throw new HttpException('Comment with id ({id}) not found', HttpStatus.NOT_FOUND);
        }
        return comment;
    }

    @Get('course/:id')
    public async getAllByCourse(@Param('id') id: number): Promise<Comment[]> {
        return this.service.getAllByCourse(id);
    }

    @Post(':id')
    public async create(@Param('id') id: number, @Body() input: CommentInput): Promise<Comment> {
        return this.service.create(
            id,
            input.text,
            input.author,
            input.date);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() input: CommentInput): Promise<Comment> {
        return this.service.update(
            id,
            input.text,
            input.author,
            input.date);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<boolean> {
        return this.service.delete(id);
    }

}
