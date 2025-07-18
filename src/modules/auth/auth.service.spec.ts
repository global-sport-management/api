import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { userStub } from './test/stub/user.stub';
import * as bcrypt from 'bcrypt';
import {BadRequestException } from '@nestjs/common';
import {mockUserService} from './test/_mocks_/user.mock';
import { mockConfigService } from './test/_mocks_/config.mock';
import { mockJwtService } from './test/_mocks_/jwt.mock';
import { mock_token } from './test/_mocks_/token.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: UserService,
          useValue: mockUserService
        },
        {
          provide: ConfigService,
          useValue: mockConfigService
        },
       ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe("login",()=>{
    const loginDto = {
      username : 'dienmayxanh',
      password: '1234567'
    }
    const accessToken = "accessToken"
    it('successfully login with username , password',async()=>{
       //jest.spyOn(userService,'findOne').mockResolvedValue(userStub());
       jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);
      // jest.spyOn(configService,'get').mockImplementation();
     //  jest.spyOn(jwtService,'signAsync').mockResolvedValue(mock_token);
       const result = await service.login(loginDto);
       console.log(`result: ${JSON.stringify(result)}`);
      // expect(userService.findOne).toHaveBeenCalled()
      //check bcrypt.compareSync
       expect(bcrypt.compareSync).toHaveBeenCalled()
       //expect(jwtService.signAsync).toHaveBeenCalled()
       //check result 
       expect(result).toEqual({accessToken:mock_token, userInfo:userStub()});
    })

    it('Should throw BadRequestException if not found user with username', async()=>{
      jest.spyOn(userService,'findOne').mockResolvedValue(null);
      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
      expect(userService.findOne).toHaveBeenCalled()
    })
    it('Should throw BadRequestException if password does not mactch', async()=>{
      jest.spyOn(userService,'findOne').mockResolvedValue(userStub());
      jest.spyOn(bcrypt,'compareSync').mockReturnValue(false)
      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
      expect(userService.findOne).toHaveBeenCalled()
      expect(bcrypt.compareSync).toHaveBeenCalled()
    })

  })
});
