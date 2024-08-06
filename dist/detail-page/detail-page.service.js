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
exports.DetailPageService = void 0;
const common_1 = require("@nestjs/common");
const board_entity_1 = require("../board/entities/board.entity");
const sequelize_1 = require("@nestjs/sequelize");
const comment_service_1 = require("../comment/comment.service");
const comment_entity_1 = require("../comment/entities/comment.entity");
const sequelize_typescript_1 = require("sequelize-typescript");
const likes_service_1 = require("../likes/likes.service");
const fs = require("fs/promises");
const path = require("path");
let DetailPageService = class DetailPageService {
    constructor(BoardEntity, ReplyEntity, commentService, likeService, sequelize) {
        this.BoardEntity = BoardEntity;
        this.ReplyEntity = ReplyEntity;
        this.commentService = commentService;
        this.likeService = likeService;
        this.sequelize = sequelize;
    }
    async getContentAndReply(boardId, category, limit, offset) {
        const safeLimit = Number.isNaN(limit) || limit < 1 ? 10 : limit;
        const safeOffset = Number.isNaN(offset) || offset < 0 ? 0 : offset;
        const result = await this.sequelize.transaction(async (transaction) => {
            const content = await this.BoardEntity.findOne({ where: { id: boardId, categories: category }, transaction });
            if (content) {
                content.boardView += 1;
                await content.save({ transaction });
            }
            const reply = await this.commentService.findAll(boardId, category, safeLimit, safeOffset);
            return { content, reply };
        });
        return result;
    }
    async update(id, updateDetailPageDto) {
        const content = await this.BoardEntity.findByPk(id);
        if (!content) {
            throw new Error("Post does not exist");
        }
        const { boardFile, boardContent, boardTitle } = updateDetailPageDto;
        const updateData = {
            boardFile: boardFile !== undefined ? boardFile : content.boardFile,
            boardTitle: boardTitle !== undefined ? boardTitle : content.boardTitle,
            boardContent: boardContent !== undefined ? boardContent : content.boardContent
        };
        try {
            if ((content.boardFile !== boardFile) && (boardFile)) {
                const staticPath = path.join(__dirname, "..", "..", "static", content.boardFile);
                await fs.unlink(staticPath);
            }
        }
        catch (err) {
            throw new Error("업데이트 - 기존 파일 삭제 에러 발생");
        }
        return content.update(updateData);
    }
    async softRemove(id) {
        const content = await this.BoardEntity.findByPk(id);
        if (content.boardFile) {
            const staticPath = path.join(__dirname, "..", "..", "static", content.boardFile);
            await fs.unlink(staticPath);
        }
        const affectedRows = await this.BoardEntity.destroy({
            where: { id }
        });
        if (affectedRows === 0) {
            throw new common_1.NotFoundException("게시물을 찾을 수 없습니다.");
        }
        else {
            await this.ReplyEntity.destroy({
                where: { boardId: id }
            });
        }
    }
};
exports.DetailPageService = DetailPageService;
exports.DetailPageService = DetailPageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(board_entity_1.Board)),
    __param(1, (0, sequelize_1.InjectModel)(comment_entity_1.Reply)),
    __metadata("design:paramtypes", [Object, Object, comment_service_1.CommentService,
        likes_service_1.LikesService,
        sequelize_typescript_1.Sequelize])
], DetailPageService);
//# sourceMappingURL=detail-page.service.js.map