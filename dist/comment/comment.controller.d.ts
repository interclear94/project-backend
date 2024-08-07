import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class CommentController {
    private readonly commentService;
    private readonly userService;
    constructor(commentService: CommentService, userService: UsersService);
    create(createCommentDto: CreateCommentDto, category: string, id: string, userToken: string, nicknameToken: string, res: Response, req: Request): Promise<Response>;
    update(id: string, updateCommentDto: UpdateCommentDto, res: Response, req: Request, category: string): Promise<void>;
    remove(boardId: string, id: string, category: string, res: Response, req: Request): Promise<Response>;
}
