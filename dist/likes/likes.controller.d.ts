import { LikesService } from './likes.service';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class LikesController {
    private readonly likesService;
    private readonly userService;
    constructor(likesService: LikesService, userService: UsersService);
    likeToggle(userToken: string, category: string, id: string, res: Response, req: Request): Promise<Response>;
    findUserLikeInfo(userToken: string, boardId: string, category: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
