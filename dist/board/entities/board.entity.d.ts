import { Model } from "sequelize-typescript";
import { Reply } from "src/comment/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
export declare class Board extends Model<Board> {
    id: number;
    boardTitle: string;
    boardContent: string;
    boardView: number;
    uid: string;
    unickname: string;
    uprofile?: string;
    categories: string;
    boardFile?: string;
    boardLike: number;
    numberOfComment: number;
    comments: Reply[];
    likes: Like[];
}
