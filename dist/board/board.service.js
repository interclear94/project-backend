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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const board_entity_1 = require("./entities/board.entity");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
let BoardService = class BoardService {
    constructor(BoardEntity) {
        this.BoardEntity = BoardEntity;
    }
    exceptSpecialChar(word) {
        return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    highlightText(text, searchTerm) {
        if (!searchTerm.trim())
            return text;
        const escapedTerm = this.exceptSpecialChar(searchTerm);
        const filterdTerm = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(filterdTerm, '<mark>$1</mark>');
    }
    async create(createBoardDto, category) {
        try {
<<<<<<< HEAD
            const { boardTitle, boardContent, uid, unickname, boardFile } = createBoardDto;
=======
            const { boardTitle, boardContent, uid, unickname, uprofile, boardFile } = createBoardDto;
>>>>>>> jinwoo
            return await this.BoardEntity.create({
                boardTitle, boardContent, uid, unickname, uprofile, boardFile, categories: category
            });
        }
        catch (err) {
            if (err.message === "SequelizeForeignKeyConstraintError") {
                throw new Error("ForeignKeyConstraintError");
            }
            throw err;
        }
    }
    async findAll(limit, offset, category) {
        const safeLimit = Number.isNaN(limit) || limit < 1 ? 10 : limit;
        const safeOffset = Number.isNaN(offset) || offset < 0 ? 0 : offset;
        const whereCondition = category ? { categories: category } : {};
        return await this.BoardEntity.findAll({
            where: whereCondition,
            limit: safeLimit,
            offset: safeOffset,
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }
    async searchBoard(limit, offset, word) {
        const safeLimit = Number.isNaN(limit) || limit < 1 ? 10 : limit;
        const safeOffset = Number.isNaN(offset) || offset < 0 ? 0 : offset;
        try {
            const foundBoard = await this.BoardEntity.findAll({
                where: {
                    [sequelize_2.Op.or]: [
                        { boardTitle: { [sequelize_2.Op.like]: `%${word}%` } },
                        { boardContent: { [sequelize_2.Op.like]: `%${word}%` } },
                    ],
                },
                limit: safeLimit,
                offset: safeOffset,
                order: [['createdAt', 'DESC']],
            });
            return foundBoard.map(item => {
                const plainItem = item.toJSON();
                return {
                    ...plainItem,
                    boardTitle: this.highlightText(plainItem.boardTitle, word),
                    boardContent: this.highlightText(plainItem.boardContent, word),
                };
            });
        }
        catch (err) {
            console.error('Error occurred:', err.message);
            throw err;
        }
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(board_entity_1.Board)),
    __metadata("design:paramtypes", [Object])
], BoardService);
//# sourceMappingURL=board.service.js.map