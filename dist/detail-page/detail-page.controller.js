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
exports.DetailPageController = void 0;
const common_1 = require("@nestjs/common");
const detail_page_service_1 = require("./detail-page.service");
const update_detail_page_dto_1 = require("./dto/update-detail-page.dto");
const board_entity_1 = require("../board/entities/board.entity");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../lib/multer.config");
let DetailPageController = class DetailPageController {
    constructor(detailPageService) {
        this.detailPageService = detailPageService;
    }
    async getDetailPage(category, id, limit = '10', offset = '0', res) {
        const parsedId = Number(id);
        const parsedLimit = Number(limit);
        const parsedOffset = Number(offset);
        try {
            const content = await this.detailPageService.getContentAndReply(parsedId, category, parsedLimit, parsedOffset);
            return res.status(200).json({ message: "게시물 조회 성공", wholeContents: content });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async update(category, id, updateDetailPageDto, file, res) {
        try {
            if (file) {
                const filePath = '/img/' + file.filename;
                updateDetailPageDto.boardFile = filePath;
            }
            await this.detailPageService.update(+id, updateDetailPageDto);
            return res.status(200).json({ message: "게시물 수정 완료", id, category });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async remove(id, category, res) {
        try {
            await this.detailPageService.softRemove(+id);
            return res.status(200).json({ message: "게시물 삭제 완료", category });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
};
exports.DetailPageController = DetailPageController;
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "게시물 및 댓글 조회" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "게시물 조회 완료", type: board_entity_1.Board }),
    __param(0, (0, common_1.Param)("category")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DetailPageController.prototype, "getDetailPage", null);
__decorate([
    (0, common_1.Patch)(':id/postUpdate'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('boardFile', multer_config_1.multerOptions)),
    (0, swagger_1.ApiOperation)({ summary: "게시물 수정" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "게시물 수정 완료" }),
    (0, swagger_1.ApiBody)({ type: update_detail_page_dto_1.UpdateDetailPageDto }),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_detail_page_dto_1.UpdateDetailPageDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DetailPageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/postDelete'),
    (0, swagger_1.ApiOperation)({ summary: "게시물 삭제" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('category')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DetailPageController.prototype, "remove", null);
exports.DetailPageController = DetailPageController = __decorate([
    (0, swagger_1.ApiTags)("상세페이지 API"),
    (0, common_1.Controller)('board/:category'),
    __metadata("design:paramtypes", [detail_page_service_1.DetailPageService])
], DetailPageController);
//# sourceMappingURL=detail-page.controller.js.map