import { AnyCnameRecord } from 'dns';
import { SendOtpDto } from './dto/send-otp.dto';

export abstract class AuthInterface {
  abstract login(body: any);
  abstract googleLogin(body: any);
  abstract register(body: any);
  abstract findPassword(body: any);
  abstract sendOtp(body: SendOtpDto);
}
