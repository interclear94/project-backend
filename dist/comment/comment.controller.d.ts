import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, category: string, id: string, userToken: string, nicknameToken: string, res: Response): Promise<Response>;
    update(id: string, updateCommentDto: UpdateCommentDto, res: Response, category: string): Promise<void>;
    remove(boardId: string, id: string, category: string, res: Response): Promise<Response>;
}
