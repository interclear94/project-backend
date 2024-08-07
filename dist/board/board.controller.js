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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("./board.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const swagger_1 = require("@nestjs/swagger");
const board_entity_1 = require("./entities/board.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../lib/multer.config");
const users_service_1 = require("../users/users.service");
let BoardController = class BoardController {
    constructor(boardService, userService) {
        this.boardService = boardService;
        this.userService = userService;
    }
    async create(createBoardDto, file, category, res, req) {
        try {
            const user = await this.userService.verifyToken(req.cookies.token);
            if (file) {
                const filePath = '/img/' + file.filename;
                createBoardDto.boardFile = filePath;
            }
            createBoardDto.uid = user.username;
            createBoardDto.unickname = user.sub;
            if (user.profile) {
                createBoardDto.uprofile = user.profile;
            }
            console.log(user);
            await this.boardService.create(createBoardDto, category);
            return res.status(201).json({ message: "게시물 생성 성공!", category });
        }
        catch (err) {
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
    async findAll(limit = '10', offset = '0', res) {
        let parsedLimit = Number(limit);
        let parsedOffset = Number(offset);
        try {
            const postList = await this.boardService.findAll(parsedLimit, parsedOffset);
            return res.status(200).json({ message: "전체 게시물 조회 성공", postList });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async findCategory(limit = '10', offset = '0', category, res) {
        let parsedLimit = Number(limit);
        let parsedOffset = Number(offset);
        try {
            const postList = await this.boardService.findAll(parsedLimit, parsedOffset, category);
            return res.status(200).json({ message: "특정 게시물 조회 성공", postList });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async searchController(word, limit = '10', offset = '0', res) {
        let parsedLimit = Number(limit);
        let parsedOffset = Number(offset);
        try {
            const postList = await this.boardService.searchBoard(parsedLimit, parsedOffset, word);
            return res.status(200).json({ message: "게시물 검색 성공", postList });
        }
        catch (err) {
            console.error('Search error:', err.message);
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    cookieCheckController(req) {
        const hasToken = req.cookies.token ? true : false;
        return { isLogin: hasToken };
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Post)(':category/postCreate'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('boardFile', multer_config_1.multerOptions)),
    (0, swagger_1.ApiOperation)({ summary: "게시물 생성" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "게시물 생성 성공", type: board_entity_1.Board }),
    (0, swagger_1.ApiBody)({ type: create_board_dto_1.CreateBoardDto }),
    (0, swagger_1.ApiHeader)({ name: 'userToken', description: "사용자 인증 토큰", required: true }),
    (0, swagger_1.ApiHeader)({ name: 'unickname', description: "닉네임 토큰", required: true }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('category')),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto, Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "전체 게시판 조회" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "게시물 조회 성공", type: [board_entity_1.Board] }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':category'),
    (0, swagger_1.ApiOperation)({ summary: "게시판 조회" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "게시물 조회 성공", type: [board_entity_1.Board] }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Param)('category')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findCategory", null);
__decorate([
    (0, common_1.Get)("logic/search/implement"),
    (0, swagger_1.ApiOperation)({ summary: "게시물 검색" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "게시물 검색 성공", type: [board_entity_1.Board] }),
    __param(0, (0, common_1.Query)('word')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "searchController", null);
__decorate([
    (0, common_1.Get)("Login/cookie/exist"),
    (0, swagger_1.ApiOperation)({ summary: "쿠키 존재하는지 확인" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "cookieCheckController", null);
exports.BoardController = BoardController = __decorate([
    (0, swagger_1.ApiTags)("게시판 API"),
    (0, common_1.Controller)('board'),
    __metadata("design:paramtypes", [board_service_1.BoardService,
        users_service_1.UsersService])
], BoardController);
//# sourceMappingURL=board.controller.js.map