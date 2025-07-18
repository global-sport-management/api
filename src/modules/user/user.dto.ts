import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsMongoIdObject } from '../../common/decorators/is-objectid.decorator';
export class UserRegisterBodyDto {
  @IsDefined()
  @IsNotEmpty()
  @IsMongoIdObject({message: 'id không phải là IdObject'})
  @ApiProperty({
    required: true,
    description: 'system_id',
  })
  system_id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  @Matches(RegExp('[a-z0-9\-]+'))
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    description: 'username',
  })
  username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 30,
    description: 'password',
  })
  password: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'firstname',
  })
  firstname: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'firstname',
  })
  lastname: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: false,
    description: 'email',
  })
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({
    required: false,
    description: 'phone',
  })
  phone: string;
}
export class UserUpdateBodyDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: false,
    description: 'email',
  })
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({
    required: false,
    description: 'phone',
  })
  phone: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'firstname',
  })
  firstname: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'firstname',
  })
  lastname: string;
}
export class ParamIdDto {
  @IsNotEmpty()
  @IsMongoIdObject({message: 'id không phải là IdObject'})
  @ApiProperty({
    required: true,
    description: 'id',
  })
  id: string;
}
export class UserGetQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'search',
  })
  search: string;

  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(1)
  @ApiProperty({
    required: false,
    minimum: 1,
    description: 'page, min 1,default: 1',
  })
  page: number;
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(1)
  @ApiProperty({
    required: false,
    type: Number,
    minimum: 1,
    description: 'limit,min 1,default: 10',
  })
  limit: number;
}

export class UserUpdatePasswordBodyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    description: 'currentPassword',
  })
  currentPassword: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    description: 'newPassword',
  })
  newPassword: string;
}
export class UserEkycDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'cccd',
  })
  cccd: string;
}