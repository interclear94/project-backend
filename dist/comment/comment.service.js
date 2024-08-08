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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const comment_entity_1 = require("./entities/comment.entity");
const board_entity_1 = require("../board/entities/board.entity");
let CommentService = class CommentService {
    constructor(ReplyEntity, BoardEntity) {
        this.ReplyEntity = ReplyEntity;
        this.BoardEntity = BoardEntity;
    }
    async findAll(boardId, category, limit, offset) {
        const safeLimit = Number.isNaN(limit) || limit < 1 ? 10 : limit;
        const safeOffset = Number.isNaN(offset) || offset < 0 ? 0 : offset;
        const originalComment = await this.ReplyEntity.findAll({
            where: { boardId, category, parentId: null },
            limit: safeLimit,
            offset: safeOffset,
            order: [['createdAt', 'ASC'], ['id', 'ASC']],
            include: [{
                    model: comment_entity_1.Reply,
                    as: 'replies',
                    required: false,
                    order: [['createdAt', 'ASC'], ['id', 'ASC']],
                    paranoid: false,
                }],
            paranoid: false,
        });
        const transformReply = (reply) => {
            return {
                id: reply.id,
                uid: reply.uid,
                unickname: reply.unickname,
                uprofile: reply.uprofile,
                boardId: reply.boardId,
                category: reply.category,
                replyContent: reply.deletedAt ? '삭제된 댓글입니다.' : reply.replyContent,
                parentId: reply.parentId,
                replyFile: reply.replyFile,
                createdAt: reply.createdAt,
                updatedAt: reply.updatedAt,
                deletedAt: reply.deletedAt,
                isDeleted: !!reply.deletedAt,
                replies: reply.replies ? reply.replies.map(transformReply) : [],
            };
        };
        return originalComment.map(transformReply);
    }
    async create(createCommentDto, category, boardId) {
        try {
            const { uid, unickname, uprofile, replyContent, replyFile, parentId } = createCommentDto;
            const result = await this.ReplyEntity.create({
                uid, unickname, uprofile, boardId, replyContent, replyFile, category, parentId
            });
            await this.countReply(boardId);
            return result;
        }
        catch (err) {
            if (err.name === "SequelizeForeignKeyConstraintError") {
                throw new Error("ForeignKeyConstraintError");
            }
            throw err;
        }
    }
    async update(boardId, updateCommentDto) {
        let { replyContent, id: replyId, replyFile } = updateCommentDto;
        const comment = await this.ReplyEntity.findByPk(replyId);
        if (!replyFile && comment.replyFile) {
            replyFile = comment.replyFile;
        }
        if (!comment) {
            throw new Error("reply does not exist");
        }
        return comment.update({ replyContent, replyFile });
    }
    async countReply(boardId) {
        const count = await this.ReplyEntity.count({ where: { boardId } });
        await this.BoardEntity.update({ numberOfComment: count }, { where: { id: boardId } });
    }
    async softRemove(id, boardId) {
        const numberOfAffectedRows = await this.ReplyEntity.destroy({
            where: { id }
        });
        if (numberOfAffectedRows === 0) {
            throw new common_1.NotFoundException("댓글을 찾을 수 없습니다.");
        }
        await this.countReply(boardId);
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comment_entity_1.Reply)),
    __param(1, (0, sequelize_1.InjectModel)(board_entity_1.Board)),
    __metadata("design:paramtypes", [Object, Object])
], CommentService);
//# sourceMappingURL=comment.service.js.map