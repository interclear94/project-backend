"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const sequelize_1 = require("@nestjs/sequelize");
const comment_entity_1 = require("./entities/comment.entity");
const board_entity_1 = require("../board/entities/board.entity");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const users_entity_1 = require("../users/entities/users.entity");
let CommentModule = class CommentModule {
};
exports.CommentModule = CommentModule;
exports.CommentModule = CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([comment_entity_1.Reply, board_entity_1.Board, users_entity_1.User])],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService, jwt_1.JwtService, users_service_1.UsersService],
        exports: [comment_service_1.CommentService]
    })
], CommentModule);
//# sourceMappingURL=comment.module.js.map