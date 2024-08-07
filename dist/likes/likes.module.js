"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModule = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const likes_controller_1 = require("./likes.controller");
const sequelize_1 = require("@nestjs/sequelize");
const like_entity_1 = require("./entities/like.entity");
const board_entity_1 = require("../board/entities/board.entity");
const users_service_1 = require("../users/users.service");
const users_entity_1 = require("../users/entities/users.entity");
const jwt_1 = require("@nestjs/jwt");
let LikesModule = class LikesModule {
};
exports.LikesModule = LikesModule;
exports.LikesModule = LikesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([board_entity_1.Board, like_entity_1.Like, users_entity_1.User])],
        controllers: [likes_controller_1.LikesController],
        providers: [likes_service_1.LikesService, users_service_1.UsersService, jwt_1.JwtService],
    })
], LikesModule);
//# sourceMappingURL=likes.module.js.map