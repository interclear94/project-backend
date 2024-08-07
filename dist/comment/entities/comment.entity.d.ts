import { Model } from "sequelize-typescript";
import { Board } from "src/board/entities/board.entity";
export declare class Reply extends Model<Reply> {
    id: number;
    uid: string;
    unickname: string;
    uprofile?: string;
    boardId: number;
    category: string;
    replyContent: string;
    parentId?: number;
    replyFile?: string;
    board: Board;
    preantReply: Reply;
    replies: Reply[];
}
