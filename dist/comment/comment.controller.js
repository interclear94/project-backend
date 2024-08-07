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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const comment_entity_1 = require("./entities/comment.entity");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
let CommentController = class CommentController {
    constructor(commentService, userService) {
        this.commentService = commentService;
        this.userService = userService;
    }
    async create(createCommentDto, category, id, res, req) {
        try {
            const userInfo = await this.userService.verifyToken(req.cookies.token);
            const boardId = Number(id);
            createCommentDto.uid = userInfo.username;
            createCommentDto.unickname = userInfo.sub;
            await this.commentService.create(createCommentDto, category, boardId);
            return res.status(201).json({ message: "댓글 생성 성공", category, id });
        }
        catch (err) {
            console.log("comment.controller.ts -> create");
            if (err.message === "ForeignKeyConstraintError") {
                res.status(400).json({ error: '외래키 오류' });
            }
            else if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException("유효하지 않은 토큰");
            }
            else {
                res.status(400).json({ error: err.message });
            }
        }
    }
    async update(id, updateCommentDto, res, req, category) {
        const boardId = Number(id);
        try {
            await this.userService.verifyToken(req.cookies.token);
            await this.commentService.update(boardId, updateCommentDto);
            res.status(201).json({ message: "게시물 수정 완료", boardId, category });
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException("유효하지 않은 토큰");
            }
            else {
                throw new common_1.InternalServerErrorException(err.mesaage);
            }
        }
    }
    async remove(boardId, id, category, res, req) {
        try {
            await this.userService.verifyToken(req.cookies.token);
            const parsedId = Number(id);
            const parseBoardId = Number(boardId);
            await this.commentService.softRemove(parsedId, parseBoardId);
            return res.status(200).json({ message: "게시물 삭제 완료", parsedId, category });
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException("유효하지 않은 토큰");
            }
            else {
                throw new common_1.InternalServerErrorException(err.mesaage);
            }
        }
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)(':id/replyCreate'),
    (0, swagger_1.ApiOperation)({ summary: "댓글 작성" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "댓글 생성 성공" }),
    (0, swagger_1.ApiBody)({ type: create_comment_dto_1.CreateCommentDto }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Param)('category')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/replyUpdate'),
    (0, swagger_1.ApiOperation)({ summary: "댓글 수정" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "댓글 수정 성공", type: [comment_entity_1.Reply] }),
    (0, swagger_1.ApiBody)({ type: update_comment_dto_1.UpdateCommentDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Param)('categort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':boardId/:id/replyDelete'),
    (0, swagger_1.ApiOperation)({ summary: "댓글 삭제" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "댓글 삭제 완료" }),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('category')),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)("댓글 API"),
    (0, common_1.Controller)('board/:category'),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        users_service_1.UsersService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map