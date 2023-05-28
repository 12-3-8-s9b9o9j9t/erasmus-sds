import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test/mock';
import { Comment } from './comment.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory},
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
