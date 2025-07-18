
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

export class AppleLoginBodyDto {
    @IsString()
    @IsNotEmpty({message: i18nValidationMessage('validation.isNotEmpty')})
    @ApiProperty({
      required: true,
      description: 'identityToken',
    })
    identityToken: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
      required: false,
      description: 'name',
    })
    name: string;
  }