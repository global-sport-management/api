import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { RegisterBodyDto } from './dto/auth.dto';

//jest.mock('./test/_mocks_/auth.service.ts');
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   //imports:[JwtModule,UserModule,ConfigModule],
    //   providers: [
    //     {
    //       provide: AuthService,
    //     }
    //     ,
    //     {
    //       provide: UserService,
    //       useValue: mockUserService
    //     },
    //     {
    //       provide: JwtService,
    //       useValue: mockJwtService
    //     },
    //     {
    //       provide: ConfigService,
    //       useValue: mockConfigService
    //     }
    //   ],
    //   controllers: [AuthController],
    // }).compile();

    // controller = module.get<AuthController>(AuthController);
    // service = module.get<AuthService>(AuthService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  

});
