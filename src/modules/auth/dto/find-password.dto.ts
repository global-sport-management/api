import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  IsDefined,
  IsEmail,
} from 'class-validator';
import {
  toBoolean,
  toLowerCase,
  toNumber,
  trim,
  toDate,
} from '../../../common/helper/cast.helper';

export class FindPasswordBodyDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({
    required: true,
    description: 'email ',
  })
  email: string;
}
