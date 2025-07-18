import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserPayload } from '../../modules/auth/passports/jwt.strategy';
import { UserService } from './user.service';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';

@Controller('/v1/users')
@ApiTags('User APIs')
export class UserController {
  constructor(
    private service: UserService,
    private readonly logger: CustomLoggerService, 
  ) { }

  
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Log out',
    description: 'Log out',
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
  public async logout(@User() user: UserPayload) {
    const result = await this.service.findOneAndLogout(user.id);
    return result;
  }

  // @Post('/account')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'My account',
  //   description: 'My account',
  // })
  // @ApiResponse({
  //   description: 'Created successfully',
  // })
  // @ApiBadRequestResponse({
  //   description: 'Invalid parameter',
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Internal server error',
  // })
  // @ApiUnauthorizedResponse({
  //   description: 'Unauthorized',
  // })
  // public async myAccount(@User() user: UserPayload) {
  //   try {
      
  //   } catch (error) {
  //     this.logger.error('My account  failed', error.stack);
  //     throw error; // Re-throw the error to ensure the client receives it
  //   }
  // }
}
