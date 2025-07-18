import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passports/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: Number(configService.get('JWT_EXPIRES_IN')) || '30d',
            algorithm: 'HS256',
          },
        };
      },
    }),
  ],
  providers: [AuthService,JwtStrategy,CustomLoggerService],
  controllers: [AuthController]
})
export class AuthModule {}
