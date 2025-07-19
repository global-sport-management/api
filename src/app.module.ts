import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { merge } from 'lodash';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { defaultConfig } from './config/default.config';
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import { ClubsModule } from './modules/clubs/clubs.module';
import { EventsModule } from './modules/events/events.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 1000,
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          let envConfig = {};
          try {
            envConfig =
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              require(
                `./config/${process.env.ENVIRONMENT}.config`,
              ).configuration;
          } catch (e) {}
          return merge(defaultConfig, envConfig, process.env);
        },
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('🚀 MONGO_URL:', configService.get('MONGO_URL'))
        return {
          uri: configService.get('MONGO_URL'),
        };
      },
    }),
    AuthModule,
    UserModule,
    ClubsModule,
    EventsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // CustomLoggerService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
