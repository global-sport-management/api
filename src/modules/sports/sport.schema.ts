// src/sports/schemas/sport.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

@Schema()
export class Sport extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, alias: 'id', auto: true })
    @ApiProperty({
      example: '613cd71895da91992a9a8a34',
      description: 'Unique ID of the sport',
    })
    _id: ObjectId;

    @Prop({ required: true })
    @ApiProperty({
        description: 'name',
    })
    name: string;

    @ApiProperty({
        description: 'name VI',
    })
    @Prop({ required: true })
    name_vi: string;

    @Prop()
    @ApiProperty({
        description: 'icon url',
    })
    icon_url: string;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
