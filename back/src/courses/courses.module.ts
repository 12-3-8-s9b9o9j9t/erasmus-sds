import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';

@Module({
    controllers: [CoursesController],
    providers: [CoursesService],
    imports: [TypeOrmModule.forFeature([Course])],
    exports: [CoursesService],
})
export class CoursesModule {}
