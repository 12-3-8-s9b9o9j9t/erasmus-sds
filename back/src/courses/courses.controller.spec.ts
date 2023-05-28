import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { repositoryMockFactory } from '../../test/mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/comment.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;
  let commentService: CommentsService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        CoursesService,
        { provide: getRepositoryToken(Course), useFactory: repositoryMockFactory },
        CommentsService,
        { provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory },
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
    commentService = module.get<CommentsService>(CommentsService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
