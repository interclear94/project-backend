import { Like } from './entities/like.entity';
import { Board } from 'src/board/entities/board.entity';
export declare class LikesService {
    private readonly LikeEntity;
    private readonly BoardEntity;
    constructor(LikeEntity: typeof Like, BoardEntity: typeof Board);
    countLike(boardId: number, category: string): Promise<number>;
    updateLikeStatus(boardId: number, category: string, uid: string): Promise<string>;
    WhetherLike(boardId: number, category: string, uid?: string): Promise<boolean>;
}
