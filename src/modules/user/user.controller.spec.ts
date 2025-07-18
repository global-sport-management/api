import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { mockParamIdDto, mockUserGetQueryDto, mockUserRegisterBodyDto, mockUserUpdateBodyDto, mockUserUpdatePasswordBodyDto } from './test/stub/dto.stub';
import { userPayloadStub, userStub } from './test/stub/user.stub';
import { UserService } from './user.service';
import { MockUserService } from './test/_mocks_/user.mock';

jest.mock('./test/_mocks_/validate.mock.ts');
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        UserController,
      ],
      providers: [
        {
          provide: UserService,
          useValue: MockUserService
        }]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('shoud add user', async()=>{
    const expectedOutput = await controller.add(userPayloadStub(),mockUserRegisterBodyDto);
    expect(service.createByUserId).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual({...userStub(),createdBy: userPayloadStub().id});
  })
  it('Add User To System', async()=>{
    const expectedOutput = await controller.addUserToSystem(userPayloadStub(),mockUserRegisterBodyDto);
    expect(service.add).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual({...userStub(),createdBy: userPayloadStub().id});
  })
  it('get Users', async()=>{
    const expectedOutput = await controller.get(userPayloadStub(),mockUserGetQueryDto);
    expect(service.findMany).toHaveBeenCalledTimes(1);
  })
  it('update user', async()=>{
    const expectedOutput = await controller.update(userPayloadStub(),mockParamIdDto,mockUserUpdateBodyDto);
    expect(service.findOneAndUpdate).toHaveBeenCalledTimes(1);
  })

  it('update password', async()=>{
    const expectedOutput = await controller.updatePassword(userPayloadStub(),mockParamIdDto, mockUserUpdatePasswordBodyDto);
    expect(service.updatePassword).toHaveBeenCalledTimes(1);
  })

  it('remove user', async()=>{
    const expectedOutput = await controller.remove(userPayloadStub(),mockParamIdDto);
    expect(service.findOneAndRemove).toHaveBeenCalledTimes(1);
  })

  it('detail user', async()=>{
    const expectedOutput = await controller.getDetail(userPayloadStub(),mockParamIdDto);
    expect(service.findOneById).toHaveBeenCalledTimes(1);
  })

  it('profile user', async()=>{
    const expectedOutput = await controller.getMyProfile(userPayloadStub());
    expect(service.getMyProfile).toHaveBeenCalledTimes(1);
  })

  it('logout', async()=>{
    const expectedOutput = await controller.logout(userPayloadStub());
    expect(service.findOneAndLogout).toHaveBeenCalledTimes(1);
  })

});
