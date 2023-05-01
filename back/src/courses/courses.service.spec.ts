import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { repositoryMockFactory } from '../../test/mock';
import { CommentsModule } from '../comments/comments.module';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/comment.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let commentService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: getRepositoryToken(Course), useFactory: repositoryMockFactory},
        CommentsService,
        { provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    commentService = module.get<CommentsService>(CommentsService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
