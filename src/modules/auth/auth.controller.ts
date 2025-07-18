import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';
import { RegisterBodyDto } from './dto/register.dto';
import { LoginBodyDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { Throttle } from '@nestjs/throttler';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('/v1/auth')
@ApiTags('Auth APIs')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logger: CustomLoggerService, 
  ) {}

  @Post('/register')
  @Throttle({ default: { limit: 6, ttl: 30000 } })
  @ApiOperation({
    summary: 'Register',
    description: 'Register',
  })
  @ApiResponse({
    description: 'Created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameter',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  public async register(@Body() body: RegisterBodyDto) {
    try {
      return  await  this.authService.register(body);
    } catch (error) {
      this.logger.error(`Register  failed ${JSON.stringify(body)}`, error.stack);
      throw error; // Re-throw the error to ensure the client receives it
    }
  }

  @Post('/login')
  @Throttle({ default: { limit: 6, ttl: 10000 } })
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  @ApiResponse({
    description: 'Created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameter',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  public async login(@Body() body: LoginBodyDto) {
    // const result = await this.service.login(body);
    // return result;
    try {
      return  await this.authService.login(body);
    } catch (error) {
      this.logger.error('Login request failed', error.stack);
      throw error; // Re-throw the error to ensure the client receives it
    }
  }
  @Post('verify-otp')
  @Throttle({ default: { limit: 6, ttl: 10000 } })
  @ApiOperation({
    summary: 'Verify-otp',
    description: 'verify-otp',
  })
  @ApiResponse({
    description: 'Created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameter',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { phoneNumber, otpCode } = verifyOtpDto;
    return this.authService.verifyOtp(phoneNumber, otpCode);
  }

  @Post('/send-otp')
  @Throttle({ default: { limit: 6, ttl: 10000 } })
  @ApiOperation({
    summary: 'send-otp',
    description: 'send-otp',
  })
  @ApiResponse({
    description: 'Created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameter',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  public async sendOtp(@Body() body: SendOtpDto) {
    try {
      return  await  this.authService.sendOtp(body);
    } catch (error) {
      this.logger.error(`Register  failed ${JSON.stringify(body)}`, error.stack);
      throw error; // Re-throw the error to ensure the client receives it
    }
  }
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto);
    return { success:true, message: 'Mật khẩu đã được cập nhật thành công.' };
  }
}
