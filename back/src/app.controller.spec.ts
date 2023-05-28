import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../test/mock';
import { User } from './users/user.entity';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        JwtService,
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);
    userService = app.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
