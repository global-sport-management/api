import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sport } from './sport.schema';
import { Model } from 'mongoose';

@Injectable()
export class SportsService {
    constructor(
        @InjectModel(Sport.name) private sportModel: Model<Sport>,
    ) {}

    async findAll(): Promise<Sport[]> {
        return this.sportModel.find().sort({ name: 1 }).exec();
    }
}
