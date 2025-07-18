import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserInterface } from './user.service.interface';
import * as bcrypt from 'bcrypt';
import { CustomLoggerService } from 'src/common/logging/custom-logger.service';

@Injectable()
export class UserService implements UserInterface {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly logger: CustomLoggerService,
  ) { }
  create = async (body: any) => {
    console.log(`create user: ${JSON.stringify(body)}`);
    const newUser = await this.userModel.create(body);
    console.log(`create user: success`);
    return newUser;
  };
  createByUserId = async (userId: string, body: any) => {
    return await this.userModel.create({ ...body, createdBy: userId });
  };
  async findMany(query: any) {
    let queryData: any = { enable: true };
    if (query.search) {
      const search = query.search.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '');
      queryData = {
        $and: [
          queryData,
          {
            $or: [
              { username: { $regex: search, $options: 'i' } },
              { firstname: { $regex: search, $options: 'i' } },
              { lastname: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { phone: { $regex: search, $options: 'i' } },
            ],
          },
        ],
      };
    }
    if (query.role) {
      queryData.role = query.role;
    }
    const page = query?.page > 0 ? query.page : 1;
    const limit = query?.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;
    const users: any = await this.userModel
      .find(queryData)
      .sort({ created_at: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
    const total = await this.userModel.find(queryData).countDocuments();
    return { total, items: users };
  }
  findOneById = async (id: string) => {
    const user = await this.userModel.findById(id);
    return user;
  };
 
 
  findOneAndUpdate = async (userId: string, id: string, body: any) => {
    const user = await this.userModel.findOne(
      { enable: true, _id: id }
    );
    if (!user) {
      throw new BadRequestException('User không tồn tại');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, body, {
      returnOriginal: false,
    });
    return updatedUser;
  };
  findOneAndRemove = async (userId: string, id: string) => {
    const user = await this.userModel.findOne({ enable: true, _id: id });
    if (!user) {
      throw new BadRequestException('User không tồn tại');
    }
    await this.userModel.findByIdAndUpdate(id, { enable: false });
  };
  async findOne(query: any) {
    const user = await this.userModel.findOne(query);
    return user;
  }
  async findOneAndLogout(userId: string) {
     const success =  true;// await this.userModel.findByIdAndUpdate(userId,);
     return {success:(success)? true:false};
  }
  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { hash: newPassword }).exec();
  }
  // updatePassword = async (userId: string, id: string, body: any) => {
  //   const user = await this.userModel.findOne(
  //     { enable: true, _id: id },
  //     userId,
  //   );
  //   if (!user) {
  //     throw new BadRequestException('User không tồn tại');
  //   }
  //   if (user) {
  //     if (!bcrypt.compareSync(body.currentPassword, user.hash)) {
  //       throw new BadRequestException('Mật khẩu hiện tại không đúng');
  //     } else {
  //       const saltOrRounds = 10;
  //       const hash = await bcrypt.hash(body.newPassword, saltOrRounds);
  //       await this.userModel.findByIdAndUpdate(
  //         id,
  //         { hash: hash },
  //         {
  //           returnOriginal: false,
  //         },
  //       );
  //       return { success: true };
  //     }
  //   }
  // };
  async verifyOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
    const user = await this.userModel.findOne({ phoneNumber }).exec();
    console.log(`verifyOtp: ${JSON.stringify(user)}`);
    if (user && user.otpCode === otpCode && user.otpExpiration > new Date()) {
      user.isVerified = true;
      user.otpCode = '';
      await user.save();
      return true;
    }
    return false;
  }
  async generateOtp(phoneNumber: string) {
    const user: any = await this.userModel.findOne({ phoneNumber: phoneNumber, enable: true });
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại.');
    }
    const otpCode = await this.randomOTP(); //Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const otpExpiration = new Date(Date.now() + 5 * 60000); // OTP valid for 5 minutes
    console.log(`generateOtp: ${phoneNumber} otpCode: ${otpCode}, expirationDate: ${otpExpiration}`);
    const sendOtpRes:any = await this.sendOTP(otpCode,phoneNumber);
    if(!sendOtpRes?.ErrorMessage){
      await this.userModel.updateOne(
        { phoneNumber},
        { phoneNumber, otpCode, otpExpiration, isVerified: false },
      );
      return {success: true, messsage:'Đã gửi mã OTP đến số điện thoại của bạn.'};
   }
   return {success: false, messsage:'Chưa gửi được mã OTP. Vui lòng thử lại.'}
  }
  async randomOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Convert to string if you need the OTP as a string
  }
  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return await this.userModel.findOne({ phoneNumber }).exec();
  }
  async sendOTP(otpCode:string,phoneNumber:string){
    try {
      const url = process.env.SMS_URL; // Replace with actual API endpoints
      console.log(`sendOTP url: ${url}`);
    
      const headers = {
        'Content-Type': 'application/json',
      };
      const requestBody ={
        
          "ApiKey": process.env.SMS_APIKEY,
          "SecretKey": process.env.SMS_SECRECT_KEY,
          "Phone": phoneNumber,
          "Channels": [
              "zalo",
              "sms"
          ],
          "Data": [
              {
                  "TempID": "357135",
                  "Params": [otpCode],
                  "OAID": "2220329456072879891"
              },
              {
                  "Content": `HaoHao: Ma OTP cua ban la ${otpCode}`,
                  "IsUnicode": 0,
                  "SmsType": 2,
                  "Brandname": "HaoHao"
              }
          ]
  
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      //console.log(`sendOTP response: ${JSON.stringify(responseData)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return responseData;
    } catch (error) {
      console.log(`sendOTP error: ${JSON.stringify(error)}`);
      throw new BadRequestException('Chưa gửi được mã OTP. Vui lòng thử lại.');
    }
  }
  async clearOtp(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      otpCode: null,
      isVerified:true,
      otpExpiration: null,
    }).exec();
  }
}
