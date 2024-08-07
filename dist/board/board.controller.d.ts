import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class BoardController {
    private readonly boardService;
    private readonly userService;
    constructor(boardService: BoardService, userService: UsersService);
    create(createBoardDto: CreateBoardDto, userToken: string, nicknameToken: string, file: Express.Multer.File, category: string, res: Response, req: Request): Promise<Response>;
    findAll(limit: string, offset: string, res: Response): Promise<Response>;
    findCategory(limit: string, offset: string, category: string, res: Response): Promise<Response>;
    searchController(word: string, limit: string, offset: string, res: Response): Promise<Response>;
    cookieCheckController(req: Request): {
        isLogin: boolean;
    };
}
