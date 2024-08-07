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
exports.FaqController = void 0;
const common_1 = require("@nestjs/common");
const faq_service_1 = require("./faq.service");
let FaqController = class FaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    create(faqTitle, faqContent) {
        return this.faqService.create(faqTitle, faqContent);
    }
    async queryFind(q) {
        console.log(await this.faqService.queryFind(q));
        return await this.faqService.queryFind(q);
    }
    async findAll() {
        return await this.faqService.findAll();
    }
    async modifyFindOne(id) {
        return await this.faqService.modifyFindOne(id);
    }
    async update(id, faqTitle, faqContent) {
        return await this.faqService.update(id, faqTitle, faqContent);
    }
    delete(id) {
        return this.faqService.delete(id);
    }
};
exports.FaqController = FaqController;
__decorate([
    (0, common_1.Post)("/admin"),
    (0, common_1.Redirect)('http://127.0.0.1:5500/nestjsProject/frontend/html/faq/customercenter.html'),
    __param(0, (0, common_1.Body)('faqTitle')),
    __param(1, (0, common_1.Body)('faqContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/:q"),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "queryFind", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/adminfaq/:id"),
    __param(0, (0, common_1.Query)("modify", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "modifyFindOne", null);
__decorate([
    (0, common_1.Put)("/adminfaq/:id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('faqTitle')),
    __param(2, (0, common_1.Body)('faqContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "delete", null);
exports.FaqController = FaqController = __decorate([
    (0, common_1.Controller)('faq'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqController);
//# sourceMappingURL=faq.controller.js.map