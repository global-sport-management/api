// dtos/verify-otp.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsPhoneNumber, Length, IsDefined, MinLength, MaxLength, Matches } from 'class-validator';

export class VerifyOtpDto {
   
  @IsDefined()
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
  @Length(6, 6) // Assuming OTP is a 6-digit string
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'otpCode ',
  })
  otpCode: string;
}
