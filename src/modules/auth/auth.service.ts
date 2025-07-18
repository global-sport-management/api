import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthInterface } from './auth.service.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../user/user.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {
  }
  async sendOtp(body: SendOtpDto) {
     const otp = await this.userService.generateOtp(body.phoneNumber);
     return otp;
  }
  async register(body: any) {
      const { phoneNumber, name ,password, rePassword} = body;
      if (password!= rePassword) {
        throw new BadRequestException('Mật khậu xác nhận không đúng.');
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      console.log(`Up`);
      const user: any = await this.userService.findOne({phoneNumber});
      if (user) {
        throw new BadRequestException('Số điện thoại đã tồn tại');
      }
      console.log(`Up`);
      try {
      let data = {
        phoneNumber,
        name,
        hash,
      };
      const newUser = await this.userService.create(data);
      console.log(`Up`);
      return newUser;
    }
    catch (e) {
      this.logger.error(`Register error ${e} for data: ${JSON.parse(body)}`, 'AuthService');
    }

  }
  async login(body: any) {
    const user: any = await this.userService.findOne({ phoneNumber: body.phoneNumber, enable: true });
    if (user) {
      if (bcrypt.compareSync(body.password, user.hash)) {
        if (!user.isVerified) {
          throw new UnauthorizedException('Số điện thoại chưa được xác thực.');
        }
        const accessToken = await this.generateToken(user);
        console.log(`${new Date()} login from phone number: ${body.phoneNumber}`);
        return { accessToken, userInfo: user }
      }
      else {
        throw new BadRequestException('Mật khẩu không đúng.');
      }
    }
    else {
      throw new BadRequestException('Tài khoản không tồn tại.');
    }
  }
  socialLogin(body: any) {
    throw new Error('Method not implemented.');
  }
  findPassword(body: any) {
    throw new Error('Method not implemented.');
  }
  /**
   * Generate token
   * @param user
   * @returns
   */
  async generateToken(user: any): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        role: (user?.role) ? user?.role : UserRole.USER,
        //email: user?.email,
        phoneNumber: user?.phoneNumber,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        algorithm: 'HS256',
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );
    return token;
  }
  async verifyOtp(phoneNumber: string, otpCode: string): Promise<any> {
    const isVerified = await this.userService.verifyOtp(phoneNumber, otpCode);
    if (!isVerified) {
      throw new BadRequestException('Mã OTP không hợp lệ.');
    }
    return { message: 'Xác nhận số điện thoại thành công.' };
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { phoneNumber, otpCode, password } = forgotPasswordDto;

    // Step 1: Find the user by phone number
    const user:any = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new BadRequestException(`Không tồn tại tài khoản với số điện thoại ${phoneNumber}`);
    }

    // Step 2: Check if the provided OTP code matches and is not expired
    if (user.otpCode !== otpCode) {
      throw new BadRequestException('Mã OTP không hợp lệ .');
    }

    if (new Date() > user.otpExpiration) {
      throw new BadRequestException('Mã OTP đã hết hạn. Vui lòng gửi lại mã OTP.');
    }

    // Step 3: Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Update the user's password and reset the OTP fields
    await this.userService.updatePassword(user.id, hashedPassword);

    // Clear OTP and expiration date after successful password reset
    await this.userService.clearOtp(user.id);
  }
}
