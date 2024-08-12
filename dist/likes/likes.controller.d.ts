import { UsersService } from '../users/users.service';
import { LikesService } from './likes.service';
import { Request, Response } from 'express';
export declare class LikesController {
    private readonly likesService;
    private readonly userService;
    constructor(likesService: LikesService, userService: UsersService);
    likeToggle(userToken: string, category: string, id: string, res: Response, req: Request): Promise<Response>;
    findUserLikeInfo(boardId: string, category: string, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
}
