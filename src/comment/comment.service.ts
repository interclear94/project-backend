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


  async create(createCommentDto: CreateCommentDto, category:string, boardId:number, parentId?:number,) : Promise<Reply> {
    const {uid, unickname, replyContent, commentImg} = createCommentDto;
    return this.ReplyEntity.create({

    })
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
