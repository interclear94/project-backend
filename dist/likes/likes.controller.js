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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
let LikesController = class LikesController {
    constructor(likesService, userService) {
        this.likesService = likesService;
        this.userService = userService;
    }
    async likeToggle(userToken, category, id, res, req) {
        const boardId = Number(id);
        try {
            const userinfo = await this.userService.verifyToken(req.cookies.token);
            const resultMessage = await this.likesService.updateLikeStatus(boardId, category, userinfo.username);
            return res.status(201).json({ mesaage: resultMessage });
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
    async findUserLikeInfo(boardId, category, res, req) {
        const userinfo = await this.userService.verifyToken(req.cookies.token);
        const isLike = await this.likesService.WhetherLike(+boardId, category, userinfo.username);
        return res.status(200).json({ message: "조회 성공", isLike });
    }
};
exports.LikesController = LikesController;
__decorate([
    (0, common_1.Post)("LikeUpdate/:category/:id"),
    (0, swagger_1.ApiOperation)({ summary: "좋아요" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "좋아요 업데이트 성공" }),
    __param(0, (0, common_1.Headers)(`userToken`)),
    __param(1, (0, common_1.Param)('category')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "likeToggle", null);
__decorate([
    (0, common_1.Get)('whetherLike/:category/:id'),
    (0, swagger_1.ApiOperation)({ summary: "좋아요 했는지 확인" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "좋아요 조회 성공" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('category')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
<<<<<<< HEAD
    __metadata("design:paramtypes", [String, String, String, Object]),
=======
    __metadata("design:paramtypes", [String, String, Object, Object]),
>>>>>>> taeuk
    __metadata("design:returntype", Promise)
], LikesController.prototype, "findUserLikeInfo", null);
exports.LikesController = LikesController = __decorate([
    (0, swagger_1.ApiTags)("좋아요"),
    (0, common_1.Controller)('like'),
    __metadata("design:paramtypes", [likes_service_1.LikesService,
        users_service_1.UsersService])
], LikesController);
//# sourceMappingURL=likes.controller.js.map