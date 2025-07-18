"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var lodash_1 = require("lodash");
var auth_module_1 = require("./modules/auth/auth.module");
var user_module_1 = require("./modules/user/user.module");
var mongoose_1 = require("@nestjs/mongoose");
var config_1 = require("@nestjs/config");
var default_config_1 = require("./config/default.config");
var custom_logger_service_1 = require("./common/logging/custom-logger.service");
var core_1 = require("@nestjs/core");
var logging_interceptor_1 = require("./common/logging/logging.interceptor");
var throttler_1 = require("@nestjs/throttler");
//import { PaymentModule } from './modules/payment/payment.module';
var clubs_module_1 = require("./modules/clubs/clubs.module");
var events_module_1 = require("./modules/events/events.module");
var payments_module_1 = require("./modules/payments/payments.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                throttler_1.ThrottlerModule.forRoot([{
                        ttl: 60000,
                        limit: 1000
                    }]),
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [
                        function () {
                            var envConfig = {};
                            try {
                                envConfig =
                                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                                    require("./config/" + process.env.ENVIRONMENT + ".config").configuration;
                            }
                            catch (e) { }
                            return lodash_1.merge(default_config_1.defaultConfig, envConfig, process.env);
                        },
                    ]
                }),
                mongoose_1.MongooseModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) {
                        console.log('🚀 MONGO_URL:', configService.get('MONGO_URL'));
                        return {
                            uri: configService.get('MONGO_URL')
                        };
                    }
                }),
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                clubs_module_1.ClubsModule,
                events_module_1.EventsModule,
                payments_module_1.PaymentsModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                custom_logger_service_1.CustomLoggerService,
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: logging_interceptor_1.LoggingInterceptor
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_1.ThrottlerGuard
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
