"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailPageModule = void 0;
const common_1 = require("@nestjs/common");
const detail_page_service_1 = require("./detail-page.service");
const detail_page_controller_1 = require("./detail-page.controller");
const board_entity_1 = require("../board/entities/board.entity");
const sequelize_1 = require("@nestjs/sequelize");
const comment_module_1 = require("../comment/comment.module");
const comment_entity_1 = require("../comment/entities/comment.entity");
const like_entity_1 = require("../likes/entities/like.entity");
const likes_service_1 = require("../likes/likes.service");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("../users/entities/users.entity");
let DetailPageModule = class DetailPageModule {
};
exports.DetailPageModule = DetailPageModule;
exports.DetailPageModule = DetailPageModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([board_entity_1.Board, comment_entity_1.Reply, like_entity_1.Like, users_entity_1.User]), comment_module_1.CommentModule],
        controllers: [detail_page_controller_1.DetailPageController],
        providers: [detail_page_service_1.DetailPageService, likes_service_1.LikesService, users_service_1.UsersService, jwt_1.JwtService],
    })
], DetailPageModule);
//# sourceMappingURL=detail-page.module.js.map