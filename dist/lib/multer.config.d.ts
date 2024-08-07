import { Request } from 'express';
import { FileFilterCallback } from 'multer';
export declare const multerOptions: {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
    };
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void;
};
