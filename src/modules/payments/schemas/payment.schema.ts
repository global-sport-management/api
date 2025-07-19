import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PaymentDocument = Payment & Document;



@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      delete ret.hash;
      // delete ret.enable;
      delete ret.otpCode;
      delete ret.otpExpiration;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      delete ret.hash;
      return ret;
    },
  },
})

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'success' | 'failed';

  @Prop()
  externalId: string;

  @Prop({ type: Object })
  metadata: any;
}

export const PaymentDocumentSchema = SchemaFactory.createForClass(Payment);