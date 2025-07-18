import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginBodyDto {
    
     @IsString()
     @IsDefined()
     @IsNotEmpty()
     @IsEmail({}, { message: i18nValidationMessage('auth.validation.email') })
     @ApiProperty({
       required: true,
       example:'admin@google.com',
       description: 'email',
     })
     email: string;
  
    @IsDefined()
    @IsString()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    @ApiProperty({
      required: true,
      description: 'password',
    })
    password: string;
  }
  