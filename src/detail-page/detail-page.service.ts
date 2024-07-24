import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CommentService } from 'src/comment/comment.service';
import { Reply } from 'src/comment/entities/comment.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DetailPageService {
  constructor(
    @InjectModel(Board)
    private readonly BoardEntity: typeof Board,
    @InjectModel(Reply)
    private readonly ReplyEntity: typeof Reply,
    private readonly commentService: CommentService,
    private readonly sequelize : Sequelize
  ) {}

  // create(createDetailPageDto: CreateDetailPageDto) {
  //   return 'This action adds a new detailPage';
  // }

  // findAll() {
  //   return `This action returns all detailPage`;
  // }

  async getContentAndReply(boardId: number, category:string, limit? : number, offset?:number) : Promise<{content: Board, reply: Reply[]}> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;
    
    const result : {content : Board, reply : Reply[]} = await this.sequelize.transaction(async (transaction) => {
      const content : Board | null = await this.BoardEntity.findOne({ where : {id : boardId, categories : category}, transaction});
      if(content) {
        content.boardView += 1;
        await content.save({transaction})
      }
      const reply : Reply[]  = await this.commentService.findAll(boardId, category, safeLimit, safeOffset);
      return {content, reply}
    })

    return result;


  }

  async update(id: number, updateDetailPageDto: Partial<UpdateDetailPageDto>) : Promise<Board> {
    const content = await this.BoardEntity.findByPk(id);
    if(!content) {
      throw new Error("Post does not exist");
    }
    
    const {boardFile, boardContent, boardTitle} = updateDetailPageDto;

    const updateData = {
      boardFile : boardFile !== undefined ? boardFile : content.boardContent,
      boardTitle : boardTitle !== undefined ? boardTitle : content.boardTitle,
      boardContent : boardContent !== undefined ? boardContent : content.boardContent
    }
    

    return content.update(updateData)
  }

  async softRemove(id: number): Promise<void>{
    const affectedRows = await this.BoardEntity.destroy({
      where: {id}
    })

    if(affectedRows === 0) {
      throw new NotFoundException("게시물을 찾을 수 없습니다.")
    } else{
      await this.ReplyEntity.destroy({
        where : {boardId : id}
      })
    }
  }
}
