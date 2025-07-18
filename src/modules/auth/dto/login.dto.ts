import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginBodyDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    @ApiProperty({
      required: true,
      description: 'phoneNumber',
    })
    phoneNumber: string;
  
    @IsDefined()
    @IsString()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    @ApiProperty({
      required: true,
      description: 'password',
    })
    password: string;
  }
  