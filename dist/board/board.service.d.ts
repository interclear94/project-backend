import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { IBoard } from './interface/boaard.interface';
export declare class BoardService {
    private readonly BoardEntity;
    constructor(BoardEntity: typeof Board);
    private exceptSpecialChar;
    private highlightText;
    create(createBoardDto: CreateBoardDto, category: string): Promise<Board>;
    findAll(limit: number, offset: number, category?: string): Promise<Board[]>;
    searchBoard(limit: number, offset: number, word: string): Promise<IBoard[]>;
}
