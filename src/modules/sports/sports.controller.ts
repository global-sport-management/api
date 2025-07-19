import {Controller, Get} from '@nestjs/common';
import {SportsService} from "@/modules/sports/sports.service";
import {ApiTags} from "@nestjs/swagger";

@Controller('/api/v1/sports')
@ApiTags('Sports APIs')
export class SportsController {
    constructor(private readonly sportsService: SportsService) {}

    @Get()
    getAllSports() {
        return this.sportsService.findAll();
    }
}
