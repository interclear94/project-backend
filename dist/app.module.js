"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const faq_module_1 = require("./faq/faq.module");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("./auth/auth.module");
const axios_1 = require("@nestjs/axios");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_module_1 = require("./users/users.module");
const detail_page_module_1 = require("./detail-page/detail-page.module");
const comment_module_1 = require("./comment/comment.module");
const likes_module_1 = require("./likes/likes.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const board_module_1 = require("./board/board.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply((0, cookie_parser_1.default)()).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            axios_1.HttpModule,
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: "localhost",
                port: 3306,
                username: "root",
                password: "189189",
                database: "projectdatabase",
                sync: { force: false },
                autoLoadModels: true,
                synchronize: true,
                logging: true,
            }),
            detail_page_module_1.DetailPageModule,
            comment_module_1.CommentModule,
            likes_module_1.LikesModule,
            board_module_1.BoardModule,
            faq_module_1.FaqModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'static'),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map