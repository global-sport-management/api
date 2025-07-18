
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

export class FacebookLoginBodyDto {
    @IsString()
    @IsNotEmpty({message: i18nValidationMessage('validation.isNotEmpty')})
    @ApiProperty({
      required: true,
      description: 'token',
    })
    token: string;
  }