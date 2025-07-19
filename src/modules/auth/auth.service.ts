import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthInterface } from './auth.service.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserPlatformTypeName, UserRole } from '@/common/enums';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { verifyAppleToken } from './apple-auth.utils';

@Injectable()
export class AuthService implements AuthInterface {
  private client: OAuth2Client;

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {
    // Initialize Google OAuth client with ConfigService
    const googleClientId = this.configService.get('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(googleClientId);
  }
  async sendOtp(body: SendOtpDto) {
     const otp = await this.userService.generateOtp(body.phoneNumber);
     return otp;
  }
  async register(body: any) {
      const { email, name ,password, rePassword} = body;
      if (password!= rePassword) {
        throw new BadRequestException('Mật khậu xác nhận không đúng.');
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
     
      const user: any = await this.userService.findOne({email});
      if (user) {
        throw new BadRequestException('Số điện thoại đã tồn tại');
      }
     
      try {
      let data = {
        email,
        name,
        hash,
      };
      const newUser = await this.userService.create(data);
   
      return newUser;
    }
    catch (e) {
      this.logger.error(`Register error ${e} for data: ${JSON.parse(body)}`, 'AuthService');
    }

  }
  async login(body: any) {
    const user: any = await this.userService.findOne({ email: body.email, enable: true });
    if (user) {
      if (bcrypt.compareSync(body.password, user.hash)) {
        const accessToken = await this.generateToken(user);
        console.log(`${new Date()} login from email: ${body.email}`);
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
  async googleLogin(body: any) {

    const ticket = await this.client.verifyIdToken({
      idToken: body.token,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }

    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const avatar = payload['picture'];

    // Kiểm tra user đã tồn tại hay chưa
    let user = await await this.userService.findOne({
      platform: UserPlatformTypeName.Google,
      platformId: googleId,
    });

    if (!user) {
      // Tạo user mới
      const userBody = {
        email,
        name,
        avatar,
        platform: UserPlatformTypeName.Google,
        platformId: googleId,
        isVerified: true,
        role: UserRole.USER,
      };
      user = await this.userService.create(userBody);
    }

    // Tạo access token
    const accessToken = await this.generateToken(user);
    return {
      accessToken,
      userInfo: user,
    };
  
  }

  async facebookLogin(body: any) {
    const { token } = body;
    // Call Facebook Graph API to get user profile
    const fbUrl = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`;

    let fbUser;
    try {
      const response = await axios.get(fbUrl);
      fbUser = response.data;
    } catch (err) {
      throw new UnauthorizedException('Invalid Facebook token');
    }

    const facebookId = fbUser.id;
    const name = fbUser.name;
    const email = fbUser?.email || '';
    const avatar = fbUser.picture?.data?.url || '';

    // Check if user exists
    let user = await this.userService.findOne({
      platform: UserPlatformTypeName.Facebook,
      platformId: facebookId,
    });

    if (!user) {
      // Create new user
      user = await this.userService.create({
        email,
        name,
        avatar,
        platform: UserPlatformTypeName.Facebook,
        platformId: facebookId,
        isVerified: true,
        role: UserRole.USER,
      });
    }

    // Generate JWT
    const accessTokenJwt = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken: accessTokenJwt,
      userInfo: user,
    };
  }

  async appleLogin(body: { identityToken: string; name?: string }) {
    let applePayload;
    try {
      applePayload = await verifyAppleToken(body.identityToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid Apple identity token');
    }

    const appleId = applePayload.sub;
    const email = applePayload.email || '';
    const name = body.name || '';

    let user = await this.userService.findOne({
      platform: UserPlatformTypeName.Apple,
      platformId: appleId,
    });

    if (!user) {
      // Apple chỉ gửi tên trong lần đăng nhập đầu tiên
      user = await this.userService.create({
        email,
        name,
        platform: UserPlatformTypeName.Apple,
        platformId: appleId,
        isVerified: true,
        role: UserRole.USER,
      });
    }

    const accessToken = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      userInfo: user,
    };
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
        email: user?.email,
       // phoneNumber: user?.phoneNumber,
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
