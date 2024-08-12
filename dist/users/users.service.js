"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("./entities/users.entity");
const sequelize_2 = require("sequelize");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.saltRounds = 10;
    }
    async create(createUserDto) {
        await this.createCheck(createUserDto);
        const { uid, upw, unickname, uemail, uphone } = createUserDto;
        const uprofile = '/img/unknown.jpg';
        const hashPw = await bcrypt.hash(upw.toString(), 10);
        console.log('생성 완료');
        return this.userModel.create({ uid, upw: hashPw, unickname, uemail, uphone, uprofile });
    }
    async createCheck(createUserDto) {
        const { unickname, uemail, uphone } = createUserDto;
        const usercheck = await this.userModel.findOne({ where: { [sequelize_2.Op.or]: [{ unickname }, { uemail }, { uphone }] } });
        if (usercheck) {
            if (usercheck.unickname === unickname) {
                console.log('닉네임 중복');
                throw new common_1.UnauthorizedException('닉네임 중복');
            }
            if (usercheck.uemail === uemail) {
                console.log('이메일 중복');
                throw new common_1.UnauthorizedException('이메일 중복');
            }
            if (usercheck.uphone === uphone) {
                console.log('휴대폰 중복');
                throw new common_1.UnauthorizedException('휴대폰 중복');
            }
        }
    }
    async validateUser(loginUserDto) {
        const { uid, upw } = loginUserDto;
        const user = await this.userModel.findOne({ where: { uid } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordMatching = await bcrypt.compare(upw, user.upw);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async getUserById(userdata) {
        const uid = userdata.username;
        return await this.userModel.findOne({ where: { uid } });
    }
    async userIdCheck(uid) {
        const userInfo = await this.userModel.findOne({ where: { uid }, attributes: ['uid', 'unickname', 'uprofile', 'isadmin'] });
        if (userInfo) {
            return userInfo;
        }
        else {
            return null;
        }
    }
    async verifyToken(token) {
        try {
            const reuslt = this.jwtService.verify(token, {
                secret: process.env.Jwt_Key,
            });
            return reuslt;
        }
        catch (error) {
            console.log("오류로 빠지는지 확인");
            console.log(error);
            throw new common_1.UnauthorizedException('유효하지 않은 토큰');
        }
    }
    async update(userId, updateUserDto) {
        const user = await this.userModel.findOne({ where: { uid: userId } });
        if (!user) {
            console.log('아이디 찾을수 없음');
            throw new common_1.NotFoundException(`아이디를 찾을수 없음.`);
        }
        console.log(updateUserDto);
        if (updateUserDto.upw) {
            console.log('비밀번호 바뀜');
            updateUserDto.upw = await bcrypt.hash(updateUserDto.upw.toString(), this.saltRounds);
        }
        await user.update(updateUserDto);
        console.log('정보바뀜');
        return user;
    }
    async getUserInfo(uid) {
        const userinfo = await this.userModel.findOne({ where: { uid } });
        if (!userinfo) {
            console.log('아이디 찾을수 없음');
            throw new common_1.NotFoundException(`아이디를 찾을수 없음.`);
        }
        return userinfo;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_entity_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map