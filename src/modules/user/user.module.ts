import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocumentSchema } from './user.schema';
import { UserController } from './user.controller';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserDocumentSchema },
      ],
    ),
  ],
  providers: [UserService,CustomLoggerService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
