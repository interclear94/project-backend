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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const faq_entity_1 = require("./entity/faq.entity");
const sequelize_2 = require("sequelize");
let FaqService = class FaqService {
    constructor(faqModel) {
        this.faqModel = faqModel;
    }
    create(faqTitle, faqContent) {
        try {
            return this.faqModel.create({
                faqTitle, faqContent
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        try {
            return await this.faqModel.findAll();
        }
        catch (error) {
            console.log(error, "서비스에서 에러 났어");
        }
    }
    async modifyFindOne(id) {
        try {
            return await this.faqModel.findOne({ where: { id } });
        }
        catch (error) {
            console.log("글 수정할 인풋 불러오기");
            console.log(error);
        }
    }
    async update(id, faqTitle, faqContent) {
        try {
            return await this.faqModel.update({ faqTitle, faqContent }, { where: { id } });
        }
        catch (error) {
            console.log(error, "글 업데이트가 안됐어");
        }
    }
    delete(id) {
        try {
            return this.faqModel.destroy({ where: { id } });
        }
        catch (error) {
            console.log(error, "글 삭제가 안됨");
        }
    }
    async queryFind(keyword) {
        return await this.faqModel.findAll({
            attributes: ['id', 'faqTitle', 'faqContent'],
            where: {
                [sequelize_2.Op.or]: [{
                        faqTitle: { [sequelize_2.Op.like]: `%${keyword}%` },
                    },
                ]
            }
        });
    }
};
exports.FaqService = FaqService;
exports.FaqService = FaqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(faq_entity_1.FaqBoard)),
    __metadata("design:paramtypes", [Object])
], FaqService);
//# sourceMappingURL=faq.service.js.map