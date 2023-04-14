import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    imports: [TypeOrmModule.forFeature([Comment])],
    exports: [CommentsService],
})
export class CommentsModule {}
