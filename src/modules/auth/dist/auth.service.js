"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var user_service_1 = require("../user/user.service");
var user_schema_1 = require("../user/user.schema");
var bcrypt = require("bcrypt");
var google_auth_library_1 = require("google-auth-library");
var axios_1 = require("axios");
var apple_auth_utils_1 = require("./apple-auth.utils");
var client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
var AuthService = /** @class */ (function () {
    function AuthService(userService, jwtService, configService, logger) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = logger;
    }
    AuthService.prototype.sendOtp = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var otp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.generateOtp(body.phoneNumber)];
                    case 1:
                        otp = _a.sent();
                        return [2 /*return*/, otp];
                }
            });
        });
    };
    AuthService.prototype.register = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, name, password, rePassword, saltOrRounds, hash, user, data, newUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email, name = body.name, password = body.password, rePassword = body.rePassword;
                        if (password != rePassword) {
                            throw new common_1.BadRequestException('Mật khậu xác nhận không đúng.');
                        }
                        saltOrRounds = 10;
                        return [4 /*yield*/, bcrypt.hash(password, saltOrRounds)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, this.userService.findOne({ email: email })];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            throw new common_1.BadRequestException('Số điện thoại đã tồn tại');
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        data = {
                            email: email,
                            name: name,
                            hash: hash
                        };
                        return [4 /*yield*/, this.userService.create(data)];
                    case 4:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser];
                    case 5:
                        e_1 = _a.sent();
                        this.logger.error("Register error " + e_1 + " for data: " + JSON.parse(body), 'AuthService');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne({ email: body.email, enable: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        if (!bcrypt.compareSync(body.password, user.hash)) return [3 /*break*/, 3];
                        if (!user.isVerified) {
                            throw new common_1.UnauthorizedException('Số điện thoại chưa được xác thực.');
                        }
                        return [4 /*yield*/, this.generateToken(user)];
                    case 2:
                        accessToken = _a.sent();
                        console.log(new Date() + " login from email: " + body.email);
                        return [2 /*return*/, { accessToken: accessToken, userInfo: user }];
                    case 3: throw new common_1.BadRequestException('Mật khẩu không đúng.');
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new common_1.BadRequestException('Tài khoản không tồn tại.');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.googleLogin = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, payload, googleId, email, name, avatar, user, userBody, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.verifyIdToken({
                            idToken: body.token,
                            audience: process.env.GOOGLE_CLIENT_ID
                        })];
                    case 1:
                        ticket = _a.sent();
                        payload = ticket.getPayload();
                        if (!payload) {
                            throw new common_1.UnauthorizedException('Invalid Google token');
                        }
                        googleId = payload['sub'];
                        email = payload['email'];
                        name = payload['name'];
                        avatar = payload['picture'];
                        return [4 /*yield*/, this.userService.findOne({
                                platform: user_schema_1.UserPlatformTypeName.Google,
                                platformId: googleId
                            })];
                    case 2: return [4 /*yield*/, _a.sent()];
                    case 3:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 5];
                        userBody = {
                            email: email,
                            name: name,
                            avatar: avatar,
                            platform: user_schema_1.UserPlatformTypeName.Google,
                            platformId: googleId,
                            isVerified: true,
                            role: user_schema_1.UserRole.USER
                        };
                        return [4 /*yield*/, this.userService.create(userBody)];
                    case 4:
                        user = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.generateToken(user)];
                    case 6:
                        accessToken = _a.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                userInfo: user
                            }];
                }
            });
        });
    };
    AuthService.prototype.facebookLogin = function (body) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var token, fbUrl, fbUser, response, err_1, facebookId, name, email, avatar, user, accessTokenJwt;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = body.token;
                        fbUrl = "https://graph.facebook.com/me?fields=id,name,email,picture&access_token=" + token;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(fbUrl)];
                    case 2:
                        response = _c.sent();
                        fbUser = response.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        throw new common_1.UnauthorizedException('Invalid Facebook token');
                    case 4:
                        facebookId = fbUser.id;
                        name = fbUser.name;
                        email = (fbUser === null || fbUser === void 0 ? void 0 : fbUser.email) || '';
                        avatar = ((_b = (_a = fbUser.picture) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url) || '';
                        return [4 /*yield*/, this.userService.findOne({
                                platform: user_schema_1.UserPlatformTypeName.Facebook,
                                platformId: facebookId
                            })];
                    case 5:
                        user = _c.sent();
                        if (!!user) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.userService.create({
                                email: email,
                                name: name,
                                avatar: avatar,
                                platform: user_schema_1.UserPlatformTypeName.Facebook,
                                platformId: facebookId,
                                isVerified: true,
                                role: user_schema_1.UserRole.USER
                            })];
                    case 6:
                        // Create new user
                        user = _c.sent();
                        _c.label = 7;
                    case 7:
                        accessTokenJwt = this.jwtService.sign({
                            sub: user._id,
                            email: user.email,
                            role: user.role
                        });
                        return [2 /*return*/, {
                                accessToken: accessTokenJwt,
                                userInfo: user
                            }];
                }
            });
        });
    };
    AuthService.prototype.appleLogin = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var applePayload, e_2, appleId, email, name, user, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apple_auth_utils_1.verifyAppleToken(body.identityToken)];
                    case 1:
                        applePayload = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        throw new common_1.UnauthorizedException('Invalid Apple identity token');
                    case 3:
                        appleId = applePayload.sub;
                        email = applePayload.email || '';
                        name = body.name || '';
                        return [4 /*yield*/, this.userService.findOne({
                                platform: user_schema_1.UserPlatformTypeName.Apple,
                                platformId: appleId
                            })];
                    case 4:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userService.create({
                                email: email,
                                name: name,
                                platform: user_schema_1.UserPlatformTypeName.Apple,
                                platformId: appleId,
                                isVerified: true,
                                role: user_schema_1.UserRole.USER
                            })];
                    case 5:
                        // Apple chỉ gửi tên trong lần đăng nhập đầu tiên
                        user = _a.sent();
                        _a.label = 6;
                    case 6:
                        accessToken = this.jwtService.sign({
                            sub: user._id,
                            email: user.email,
                            role: user.role
                        });
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                userInfo: user
                            }];
                }
            });
        });
    };
    AuthService.prototype.findPassword = function (body) {
        throw new Error('Method not implemented.');
    };
    /**
     * Generate token
     * @param user
     * @returns
     */
    AuthService.prototype.generateToken = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jwtService.signAsync({
                            id: user.id,
                            role: (user === null || user === void 0 ? void 0 : user.role) ? user === null || user === void 0 ? void 0 : user.role : user_schema_1.UserRole.USER,
                            email: user === null || user === void 0 ? void 0 : user.email
                        }, {
                            secret: this.configService.get('JWT_SECRET'),
                            algorithm: 'HS256',
                            expiresIn: this.configService.get('JWT_EXPIRES_IN')
                        })];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    AuthService.prototype.verifyOtp = function (phoneNumber, otpCode) {
        return __awaiter(this, void 0, Promise, function () {
            var isVerified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.verifyOtp(phoneNumber, otpCode)];
                    case 1:
                        isVerified = _a.sent();
                        if (!isVerified) {
                            throw new common_1.BadRequestException('Mã OTP không hợp lệ.');
                        }
                        return [2 /*return*/, { message: 'Xác nhận số điện thoại thành công.' }];
                }
            });
        });
    };
    AuthService.prototype.forgotPassword = function (forgotPasswordDto) {
        return __awaiter(this, void 0, Promise, function () {
            var phoneNumber, otpCode, password, user, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phoneNumber = forgotPasswordDto.phoneNumber, otpCode = forgotPasswordDto.otpCode, password = forgotPasswordDto.password;
                        return [4 /*yield*/, this.userService.findByPhoneNumber(phoneNumber)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.BadRequestException("Kh\u00F4ng t\u1ED3n t\u1EA1i t\u00E0i kho\u1EA3n v\u1EDBi s\u1ED1 \u0111i\u1EC7n tho\u1EA1i " + phoneNumber);
                        }
                        // Step 2: Check if the provided OTP code matches and is not expired
                        if (user.otpCode !== otpCode) {
                            throw new common_1.BadRequestException('Mã OTP không hợp lệ .');
                        }
                        if (new Date() > user.otpExpiration) {
                            throw new common_1.BadRequestException('Mã OTP đã hết hạn. Vui lòng gửi lại mã OTP.');
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        // Step 4: Update the user's password and reset the OTP fields
                        return [4 /*yield*/, this.userService.updatePassword(user.id, hashedPassword)];
                    case 3:
                        // Step 4: Update the user's password and reset the OTP fields
                        _a.sent();
                        // Clear OTP and expiration date after successful password reset
                        return [4 /*yield*/, this.userService.clearOtp(user.id)];
                    case 4:
                        // Clear OTP and expiration date after successful password reset
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(common_1.forwardRef(function () { return user_service_1.UserService; })))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
