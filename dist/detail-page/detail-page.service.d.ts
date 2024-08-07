import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { CommentService } from 'src/comment/comment.service';
import { Reply } from 'src/comment/entities/comment.entity';
import { Sequelize } from 'sequelize-typescript';
import { LikesService } from 'src/likes/likes.service';
import { IReply } from 'src/comment/interface/comment.interface';
export declare class DetailPageService {
    private readonly BoardEntity;
    private readonly ReplyEntity;
    private readonly commentService;
    private readonly likeService;
    private readonly sequelize;
    constructor(BoardEntity: typeof Board, ReplyEntity: typeof Reply, commentService: CommentService, likeService: LikesService, sequelize: Sequelize);
    getContentAndReply(boardId: number, category: string, limit?: number, offset?: number): Promise<{
        content: Board;
        reply: IReply[];
    }>;
    update(id: number, updateDetailPageDto: Partial<UpdateDetailPageDto>): Promise<Board>;
    softRemove(id: number): Promise<void>;
}
