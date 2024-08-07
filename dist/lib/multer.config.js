"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: (0, path_1.join)(__dirname, "..", "..", "static", "img"),
        filename: (req, file, cb) => {
            const fileExtName = (0, path_1.extname)(file.originalname);
            const newFileName = (0, path_1.basename)(file.originalname, fileExtName) + '_' + Date.now() + fileExtName;
            cb(null, newFileName);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException({ message: '허용되지 않은 파일 타입입니다.' }, common_1.HttpStatus.BAD_REQUEST));
        }
    }
};
//# sourceMappingURL=multer.config.js.map