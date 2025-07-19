import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Sport, SportSchema} from "@/modules/sports/sport.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sport.name, schema: SportSchema },
    ]),
  ],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService],
})
export class SportsModule {}
