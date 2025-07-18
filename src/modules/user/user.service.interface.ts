export abstract class UserInterface {
  abstract findOneById(id: string);
  abstract findOne(query: any);
  abstract create(body: any);
  abstract createByUserId(userId: string, body: any);
  abstract findOneAndUpdate(userId: string, id: string, body: any);
  abstract findOneAndRemove(userId: string, id: string);
  abstract findMany(query: any);
  abstract findOneAndLogout(userId: string);
  abstract updatePassword(userId: string, id: string, body: any);
  abstract verifyOtp(phoneNumber: string, otpCode: string);
  abstract findByPhoneNumber(phoneNumber: string);
  abstract generateOtp(phoneNumber: string) ;
}
