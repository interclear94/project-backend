"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const like_entity_1 = require("./entities/like.entity");
const board_entity_1 = require("../board/entities/board.entity");
const sequelize_2 = require("sequelize");
let LikesService = class LikesService {
    constructor(LikeEntity, BoardEntity) {
        this.LikeEntity = LikeEntity;
        this.BoardEntity = BoardEntity;
    }
    async countLike(boardId, category) {
        return this.LikeEntity.count({ where: { boardId, category } });
    }
    async updateLikeStatus(boardId, category, uid) {
        const existingLike = await this.LikeEntity.findOne({
            where: { boardId, uid, category }
        });
        if (existingLike) {
            await existingLike.destroy();
            await this.BoardEntity.update({ boardLike: sequelize_2.Sequelize.literal('boardLike - 1') }, { where: { id: boardId, categories: category } });
            const result = "좋아요 취소";
            return result;
        }
        else {
            await this.LikeEntity.create({ boardId, category, uid });
            await this.BoardEntity.update({ boardLike: sequelize_2.Sequelize.literal('boardLike + 1') }, { where: { id: boardId, categories: category } });
            const result = "좋아요";
            return result;
        }
    }
    async WhetherLike(boardId, category, uid) {
        if (!uid)
            return false;
        const existingLike = await this.LikeEntity.findOne({
            where: { boardId, uid, category }
        });
        if (existingLike) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(like_entity_1.Like)),
    __param(1, (0, sequelize_1.InjectModel)(board_entity_1.Board)),
    __metadata("design:paramtypes", [Object, Object])
], LikesService);
//# sourceMappingURL=likes.service.js.map