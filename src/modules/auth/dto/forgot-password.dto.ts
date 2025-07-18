import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, Matches, IsDefined, MaxLength, Length } from 'class-validator';
 // Custom decorator to validate that password and rePassword match

export class ForgotPasswordDto {
  
    @IsString()
    @Matches(/^(0)(3|5|7|8|9)([0-9]{8})$/, {
      message: 'Số điện thoại chưa hợp lệ.',
    })
    @ApiProperty({
      required: true,
      minLength: 10,
      maxLength: 10,
      example:'0708888012',
      description: 'Số điện thoại',
    })
    phoneNumber: string;
  
  
    @IsDefined()
    @IsString()
    @MinLength(8, {message: ' Mật khẩu phải có độ dài tối thiểu 8.'})
    @MaxLength(12, {message: ' Mật khẩu phải có độ dài tối đa 12.'})
    @Matches(/^\S*$/, { message: 'Mật khẩu không được có khoảng trắng.' })
    @ApiProperty({
      required: true,
      description: 'Mật khẩu phải từ 8 đến 12 kí tự và không có khoảng trắng.',
      minLength: 6,
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
      minLength: 6,
      example:'12345678',
      maxLength: 12,
    })
    rePassword: string;

    @IsString()
    @Length(6, 6) // Assuming OTP is a 6-digit string
    @IsNotEmpty()
    @ApiProperty({
      required: true,
      description: 'otpCode ',
    })
    otpCode: string;
}
