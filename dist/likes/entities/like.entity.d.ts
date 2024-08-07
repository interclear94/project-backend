import { Model } from "sequelize-typescript";
import { Board } from "src/board/entities/board.entity";
export declare class Like extends Model<Like> {
    id: number;
    uid: string;
    boardId: number;
    category: string;
    postId: Board;
}
