import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsOptional } from 'class-validator';
export class RegisterBodyDto {

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
  @IsNotEmpty()
  //@Matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s0-9]+$/, { message: 'Tên không được chứa kí tự đặc biệt.' })
  @MinLength(2, {message: ' Tên phải có độ dài tối thiểu 2.'})
  @MaxLength(50, {message: ' Tên phải có độ dài tối đa 50.'})
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength:50,
    example:'Nguyen Van A',
    description: 'name ',
  })
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(8, {message: ' Mật khẩu phải có độ dài tối thiểu 8.'})
  @MaxLength(12, {message: ' Mật khẩu phải có độ dài tối đa 12.'})
  @Matches(/^\S*$/, { message: 'Mật khẩu không được có khoảng trắng.' })
  @ApiProperty({
    required: true,
    description: 'Mật khẩu phải từ 8 đến 12 kí tự và không có khoảng trắng.',
    minLength: 8,
    example:'12345678',
    maxLength: 12,
  })
  password: string;


  @IsString()
  @MinLength(8, {message: ' Mật khẩu xác nhận phải có độ dài tối thiểu 8.'})
  @MaxLength(12, {message: ' Mật khẩu xác nhận phải có độ dài tối đa 12.'})
  @Matches(/^\S*$/, { message: 'Mật khẩu xác nhận không được có khoảng trắng.' })
  @ApiProperty({
    required: true,
    description: 'Mật khẩu xác nhận phải từ 8 đến 12 kí tự và không có khoảng trắng.',
    minLength: 8,
    example:'12345678',
    maxLength: 12,
  })
  rePassword: string;
}
