import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Reply } from './entities/comment.entity';
import { Board } from 'src/board/entities/board.entity';
import { IReply } from './interface/comment.interface';
export declare class CommentService {
    private readonly ReplyEntity;
    private readonly BoardEntity;
    constructor(ReplyEntity: typeof Reply, BoardEntity: typeof Board);
    findAll(boardId: number, category: string, limit: number, offset: number): Promise<IReply[]>;
    create(createCommentDto: CreateCommentDto, category: string, boardId: number): Promise<Reply>;
    update(boardId: number, updateCommentDto: UpdateCommentDto): Promise<Reply>;
    countReply(boardId: number): Promise<void>;
    softRemove(id: number, boardId: number): Promise<void>;
}
