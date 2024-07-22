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

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
