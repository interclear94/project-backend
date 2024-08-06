import { LikesService } from './likes.service';
import { Response } from 'express';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    likeToggle(userToken: string, category: string, id: string, res: Response): Promise<Response>;
    findUserLikeInfo(userToken: string, boardId: string, category: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
