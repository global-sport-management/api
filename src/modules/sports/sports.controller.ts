import {Controller, Get} from '@nestjs/common';
import {SportsService} from "@/modules/sports/sports.service";

@Controller('sports')
export class SportsController {
    constructor(private readonly sportsService: SportsService) {}

    @Get()
    getAllSports() {
        return this.sportsService.findAll();
    }
}
