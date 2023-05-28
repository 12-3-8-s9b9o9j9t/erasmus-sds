import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test/mock';
import { Comment } from './comment.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory},
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
