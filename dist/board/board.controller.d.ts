import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Request, Response } from 'express';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    create(createBoardDto: CreateBoardDto, userToken: string, nicknameToken: string, file: Express.Multer.File, category: string, res: Response): Promise<Response>;
    findAll(limit: string, offset: string, res: Response): Promise<Response>;
    findCategory(limit: string, offset: string, category: string, res: Response): Promise<Response>;
    searchController(word: string, limit: string, offset: string, res: Response): Promise<Response>;
    cookieCheckController(req: Request): {
        isLogin: boolean;
    };
}
