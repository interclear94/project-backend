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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const board_entity_1 = require("../../board/entities/board.entity");
let Reply = class Reply extends sequelize_typescript_1.Model {
};
exports.Reply = Reply;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Reply.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Reply.prototype, "uid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Reply.prototype, "unickname", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => board_entity_1.Board),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Reply.prototype, "boardId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Reply.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Reply.prototype, "replyContent", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Reply),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Reply.prototype, "parentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    __metadata("design:type", String)
], Reply.prototype, "replyFile", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => board_entity_1.Board),
    __metadata("design:type", board_entity_1.Board)
], Reply.prototype, "board", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Reply, { as: 'parentReply', foreignKey: 'parentId' }),
    __metadata("design:type", Reply)
], Reply.prototype, "preantReply", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Reply, { as: "replies", foreignKey: 'parentId' }),
    __metadata("design:type", Array)
], Reply.prototype, "replies", void 0);
exports.Reply = Reply = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "comment",
        timestamps: true,
        paranoid: true
    })
], Reply);
//# sourceMappingURL=comment.entity.js.map