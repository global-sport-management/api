import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, mongo } from 'mongoose';
import { MockUserService } from './test/_mocks_/user.mock';
import { userPayloadStub, userStub } from './test/stub/user.stub';
import { mockUserRegisterBodyDto } from './test/stub/dto.stub';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const mockUserService = {
    findById: jest.fn(),
    findOne:jest.fn(),
    create: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name))
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('Should return an user by id', async () => {
      jest.spyOn(model,'findById').mockResolvedValue(userStub());
      const expectedOutput = await service.findOneById(String(userStub()._id));
      expect(model.findById).toHaveBeenCalledWith(String(userStub()._id));
      expect(expectedOutput).toEqual(userStub());
    });
  });

  describe('findOne', () => {
    it('Should findOne', async () => {

    });
  });

  describe('create', () => {
    it('Should create', async () => {

    });
  });
  describe('add', () => {
    it('Should add successfully', async () => {
      const {username,password, firstname, lastname, email, phone, system_id,} = mockUserRegisterBodyDto;
      jest.spyOn(model,'findOne').mockResolvedValue(false);
      jest.spyOn(bcrypt,'hash').mockReturnValue();
     // jest.spyOn(model,'create').mockResolvedValue({system_id,username, hash:'123', firstname, lastname, email, phone});
      const expectedOutput = await service.add(mockUserRegisterBodyDto);
      console.log(`expectedOutput: ${JSON.stringify(expectedOutput)}`);
      expect(model.findOne).toHaveBeenCalled();
      expect(model.create).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalled()
    });
    it('Should return error if username existed', async () => {
      jest.spyOn(model,'findOne').mockResolvedValue(true);
      await expect(service.add(mockUserRegisterBodyDto)).rejects.toThrow(BadRequestException);
    });
  });
  describe('createByUserId', () => {
    it('Should createByUserId', async () => {

    });
  });
  describe('findOneAndUpdate', () => {
    it('Should findOneAndUpdate', async () => {

    });
  });
  describe('findOneAndRemove', () => {
    it('Should findOneAndRemove', async () => {

    });
  });
  describe('findMany', () => {
    it('Should findMany', async () => {

    });
  });
  describe('findOneAndLogout', () => {
    it('Should findOneAndLogout', async () => {

    });
  });
  describe('getMyProfile', () => {
    it('Should getMyProfile', async () => {

    });
  });
  describe('updatePassword', () => {
    it('Should updatePassword', async () => {

    });
  })
});
