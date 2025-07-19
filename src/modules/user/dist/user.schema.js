"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDocumentSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var swagger_1 = require("@nestjs/swagger");
var mongoose_2 = require("mongoose");
var enums_1 = require("@/common/enums");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.ObjectId, alias: 'id', auto: true }),
        swagger_1.ApiProperty({
            example: '613cd71895da91992a9a8a34',
            description: 'Unique ID of the user'
        })
    ], User.prototype, "_id");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, unique: true }),
        swagger_1.ApiProperty({
            description: 'email'
        })
    ], User.prototype, "email");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'name'
        })
    ], User.prototype, "name");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'username'
        })
    ], User.prototype, "username");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'avatar'
        })
    ], User.prototype, "avatar");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'phoneNumber'
        })
    ], User.prototype, "phoneNumber");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "enum": enums_1.UserPlatformTypeName, "default": enums_1.UserPlatformTypeName.Email }),
        swagger_1.ApiProperty({
            description: 'Platform used for registration/login (email, google, facebook, apple, etc.)'
        })
    ], User.prototype, "platform");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": null }),
        swagger_1.ApiProperty({
            description: 'OAuth platform id (e.g., Google ID, Facebook ID, Apple ID)'
        })
    ], User.prototype, "platformId");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Array, "default": [] }),
        swagger_1.ApiProperty({
            description: 'sports)'
        })
    ], User.prototype, "sports");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Array, "default": [] }),
        swagger_1.ApiProperty({
            description: 'clubs'
        })
    ], User.prototype, "clubs");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'country'
        })
    ], User.prototype, "country");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'state'
        })
    ], User.prototype, "state");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'city'
        })
    ], User.prototype, "city");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'otpCode'
        })
    ], User.prototype, "otpCode");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Boolean, "default": false }),
        swagger_1.ApiProperty({
            description: 'isVerified'
        })
    ], User.prototype, "isVerified");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Date, "default": new Date(Date.now() + 10 * 60000) })
    ], User.prototype, "otpExpiration");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String }),
        swagger_1.ApiProperty({
            description: 'hash'
        })
    ], User.prototype, "hash");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": enums_1.UserRole.USER }),
        swagger_1.ApiProperty({
            description: 'User role'
        })
    ], User.prototype, "role");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Boolean, "default": true }),
        swagger_1.ApiProperty({
            description: 'Enable or Disable',
            "default": true
        })
    ], User.prototype, "enable");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'deviceToken'
        })
    ], User.prototype, "deviceToken");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.String, "default": '' }),
        swagger_1.ApiProperty({
            description: 'deviceOs'
        })
    ], User.prototype, "deviceOs");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Date, "default": function () { return new Date(); } }),
        swagger_1.ApiProperty({
            description: 'Created date'
        })
    ], User.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.Date, "default": function () { return new Date(); } }),
        swagger_1.ApiProperty({
            description: 'Updated date'
        })
    ], User.prototype, "updatedAt");
    User = __decorate([
        mongoose_1.Schema({
            toJSON: {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    delete ret.__v;
                    delete ret.hash;
                    // delete ret.enable;
                    delete ret.otpCode;
                    delete ret.otpExpiration;
                    return ret;
                }
            },
            toObject: {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    delete ret.__v;
                    delete ret.hash;
                    return ret;
                }
            }
        })
    ], User);
    return User;
}());
exports.User = User;
exports.UserDocumentSchema = mongoose_1.SchemaFactory.createForClass(User);
