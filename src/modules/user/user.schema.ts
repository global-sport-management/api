import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document, ObjectId } from 'mongoose';
import { UserRole, UserGender, UserPlatformTypeName } from '@/common/enums';


export type UserDocument = User & Document;



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
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, alias: 'id', auto: true })
  @ApiProperty({
    example: '613cd71895da91992a9a8a34',
    description: 'Unique ID of the user',
  })
  _id: ObjectId;
  @Prop({ type: mongoose.Schema.Types.String, unique: true })
  @ApiProperty({
    description: 'email',
  })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'name',
  })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'username',
  })
  username: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'avatar',
  })
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'phoneNumber',
  })
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.String, enum: UserPlatformTypeName, default: UserPlatformTypeName.Email })
  @ApiProperty({
    description: 'Platform used for registration/login (email, google, facebook, apple, etc.)',
  })
  platform: UserPlatformTypeName;

  @Prop({ type: mongoose.Schema.Types.String, default: null })
  @ApiProperty({
    description: 'OAuth platform id (e.g., Google ID, Facebook ID, Apple ID)',
  })
  platformId: string;

  @Prop({ type: mongoose.Schema.Types.Array, default: []})
  @ApiProperty({
    description: 'sports)',
  })
  sports: Array<ObjectId>;

  @Prop({ type: mongoose.Schema.Types.Array, default: []})
  @ApiProperty({
    description: 'clubs',
  })
  clubs: Array<ObjectId>;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({  
    description: 'country',
  })
  country: string;
  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({  
    description: 'state',
  })
  state: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({  
    description: 'city',
  })
  city: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'otpCode',
  })
  otpCode: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  @ApiProperty({
    description: 'isVerified',
  })
  isVerified: boolean;

  @Prop({ type: mongoose.Schema.Types.Date, default: new Date(Date.now() + 10 * 60000) })
  otpExpiration: Date;


  @Prop({ type: mongoose.Schema.Types.String })
  @ApiProperty({
    description: 'hash',
  })
  hash: string;

  @Prop({ type: mongoose.Schema.Types.String, default: UserRole.USER })
  @ApiProperty({
    description: 'User role',
  })
  role: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: true })
  @ApiProperty({
    description: 'Enable or Disable',
    default: true,
  })
  enable: boolean;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'deviceToken'
  })
  deviceToken: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @ApiProperty({
    description: 'deviceOs'
  })
  deviceOs: string;

  @Prop({ type: mongoose.Schema.Types.Date, default: () => new Date() })
  @ApiProperty({
    description: 'Created date',
  })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: () => new Date() })
  @ApiProperty({
    description: 'Updated date',
  })
  updatedAt: Date;
}

export const UserDocumentSchema = SchemaFactory.createForClass(User);
