
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsOptional } from 'class-validator';

export class SocialLoginBodyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      required: true,
      description: 'token',
    })
    token: string;
  
    @IsDefined()
    @IsEmail()
    @ApiProperty({
      required: true,
      description: 'email ',
    })
    email: string;
  }