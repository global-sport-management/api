import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('')
@ApiTags('Healthcheck APIs')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('ping')
  ping() {

  }

  @Get('healthcheck')
  healthcheck() {

  }
}
