import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reply } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Reply)
  private readonly ReplyEntity : typeof Reply
  ) {}


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

  async findAll(boardId: number, category: string, limit: number, offset: number): Promise<Reply[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;

    return await this.ReplyEntity.findAll({
      where: {boardId, category, parentId: null},
      limit : safeLimit,
      offset : safeOffset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Reply,
        as: 'replies',
        required: false
      }]
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

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

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
