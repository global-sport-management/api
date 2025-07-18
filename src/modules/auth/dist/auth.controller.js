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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var throttler_1 = require("@nestjs/throttler");
var AuthController = /** @class */ (function () {
    function AuthController(authService, logger) {
        this.authService = authService;
        this.logger = logger;
    }
    AuthController.prototype.register = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.register(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        this.logger.error("Register  failed " + JSON.stringify(body), error_1.stack);
                        throw error_1; // Re-throw the error to ensure the client receives it
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.login(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        this.logger.error('Login request failed', error_2.stack);
                        throw error_2; // Re-throw the error to ensure the client receives it
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.loginGoogle = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.googleLogin(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        this.logger.error('Login request failed', error_3.stack);
                        throw error_3; // Re-throw the error to ensure the client receives it
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.verifyOtp = function (verifyOtpDto) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber, otpCode;
            return __generator(this, function (_a) {
                phoneNumber = verifyOtpDto.phoneNumber, otpCode = verifyOtpDto.otpCode;
                return [2 /*return*/, this.authService.verifyOtp(phoneNumber, otpCode)];
            });
        });
    };
    AuthController.prototype.sendOtp = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.sendOtp(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        this.logger.error("Register  failed " + JSON.stringify(body), error_4.stack);
                        throw error_4; // Re-throw the error to ensure the client receives it
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.forgotPassword = function (forgotPasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.forgotPassword(forgotPasswordDto)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Mật khẩu đã được cập nhật thành công.' }];
                }
            });
        });
    };
    __decorate([
        common_1.Post('/register'),
        throttler_1.Throttle({ "default": { limit: 6, ttl: 30000 } }),
        swagger_1.ApiOperation({
            summary: 'Register',
            description: 'Register'
        }),
        swagger_1.ApiResponse({
            description: 'Created successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Invalid parameter'
        }),
        swagger_1.ApiInternalServerErrorResponse({
            description: 'Internal server error'
        }),
        swagger_1.ApiUnauthorizedResponse({
            description: 'Unauthorized'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "register");
    __decorate([
        common_1.Post('/login'),
        throttler_1.Throttle({ "default": { limit: 6, ttl: 10000 } }),
        swagger_1.ApiOperation({
            summary: 'Login',
            description: 'Login'
        }),
        swagger_1.ApiResponse({
            description: 'Created successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Invalid parameter'
        }),
        swagger_1.ApiInternalServerErrorResponse({
            description: 'Internal server error'
        }),
        swagger_1.ApiUnauthorizedResponse({
            description: 'Unauthorized'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "login");
    __decorate([
        common_1.Post('/login-google'),
        throttler_1.Throttle({ "default": { limit: 6, ttl: 10000 } }),
        swagger_1.ApiOperation({
            summary: 'Login Google',
            description: 'Login Google'
        }),
        swagger_1.ApiResponse({
            description: 'Created successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Invalid parameter'
        }),
        swagger_1.ApiInternalServerErrorResponse({
            description: 'Internal server error'
        }),
        swagger_1.ApiUnauthorizedResponse({
            description: 'Unauthorized'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "loginGoogle");
    __decorate([
        common_1.Post('verify-otp'),
        throttler_1.Throttle({ "default": { limit: 6, ttl: 10000 } }),
        swagger_1.ApiOperation({
            summary: 'Verify-otp',
            description: 'verify-otp'
        }),
        swagger_1.ApiResponse({
            description: 'Created successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Invalid parameter'
        }),
        swagger_1.ApiInternalServerErrorResponse({
            description: 'Internal server error'
        }),
        swagger_1.ApiUnauthorizedResponse({
            description: 'Unauthorized'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "verifyOtp");
    __decorate([
        common_1.Post('/send-otp'),
        throttler_1.Throttle({ "default": { limit: 6, ttl: 10000 } }),
        swagger_1.ApiOperation({
            summary: 'send-otp',
            description: 'send-otp'
        }),
        swagger_1.ApiResponse({
            description: 'Created successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Invalid parameter'
        }),
        swagger_1.ApiInternalServerErrorResponse({
            description: 'Internal server error'
        }),
        swagger_1.ApiUnauthorizedResponse({
            description: 'Unauthorized'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "sendOtp");
    __decorate([
        common_1.Post('forgot-password'),
        __param(0, common_1.Body())
    ], AuthController.prototype, "forgotPassword");
    AuthController = __decorate([
        common_1.Controller('/api/v1/auth'),
        swagger_1.ApiTags('Auth APIs')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
