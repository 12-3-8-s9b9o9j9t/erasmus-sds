import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { CourseInput } from './course.input';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from '../comments/comment.entity';
import { CommentGet } from 'src/comments/comment.input';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
    constructor(
        private service: CoursesService,
    ) {}

    @Get()
    public async getAll(): Promise<Course[]> {
        return this.service.getAll();
    }

    @Get(':id')
    public async get(@Param('id') id: number): Promise<Course> {
        const course = await this.service.get(id);
        if (course === null) {
            throw new HttpException('Course with id ' + id + ' not found', HttpStatus.NOT_FOUND);
        }
        return course;
    }

    @Get(':id/comments')
    public async getComments(@Param('id') id: number): Promise<CommentGet[]> {
        const comments = await this.service.getComments(id);
        if (comments === null) {
            throw new HttpException('Course with id ' + id + ' not found', HttpStatus.NOT_FOUND);
        }
        return comments;
    }

    @Post()
    public async create(@Body() input: CourseInput): Promise<Course> {
        return this.service.create(
            input.name,
            input.description,
            input.ECTS,
            input.semester,
            input.ECTScard,
            input.faculties);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() input: CourseInput): Promise<Course> {
        return this.service.update(
            id,
            input.name,
            input.description,
            input.ECTS,
            input.semester,
            input.ECTScard,
            input.faculties);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<boolean> {
        return this.service.delete(id);
    }
}
