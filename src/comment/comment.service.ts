import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reply } from './entities/comment.entity';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class CommentService {
  constructor(
  @InjectModel(Reply)
  private readonly ReplyEntity : typeof Reply,
  @InjectModel(Board)
  private readonly BoardEntity : typeof Board
  ) {}

  // 댓글 조회
  async findAll(boardId: number, category: string, limit: number, offset: number): Promise<Reply[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;

    return await this.ReplyEntity.findAll({
      where: {boardId, category, parentId: null},
      limit : safeLimit,
      offset : safeOffset,
      order: [['createdAt', 'ASC'], ['id', 'ASC']],
      include: [{
        model: Reply,
        as: 'replies',
        required: false,
        order: [['createdAt', 'ASC'], ['id', 'ASC']]
      }]
    })
  }

  // 댓글 생성
  async create(createCommentDto: CreateCommentDto, category:string, boardId:number) : Promise<Reply> {
    try {
      const { uid, unickname, replyContent, replyFile, parentId } = createCommentDto;
      return await this.ReplyEntity.create({
        uid, unickname, boardId, replyContent, replyFile, category, parentId
      })
    } catch (err) {
      if(err.name === "SequelizeForeignKeyConstraintError"){
        throw new Error("ForeignKeyConstraintError");
      }
      throw err;
    }
  }


  // 댓글 수정
  async update(boardId: number, updateCommentDto: UpdateCommentDto): Promise<Reply> {
    let {replyContent, id : replyId, replyFile} = updateCommentDto
    const comment = await this.ReplyEntity.findByPk(replyId);

    if(!replyFile && comment.replyFile) {
      replyFile = comment.replyFile
    }
    if(!comment) {
      throw new Error("reply does not exist");
    }

    return comment.update({replyContent, replyFile});
  }

  // 댓글 수 카운트
  async countReply(boardId : number) : Promise<void> {
    const count = await this.ReplyEntity.count({where: {boardId}});
    await this.BoardEntity.update({numberOfComment : count}, {where : {id : boardId}});
  }

  // 댓글 삭제
  async softRemove(id: number): Promise<void> {
    const numberOfAffectedRows = await this.ReplyEntity.destroy({
      where : {id}
    })
    
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("댓글을 찾을 수 없습니다.");
    }
  }
}
