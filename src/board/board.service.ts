import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BoardService {

  // 보드 모델 주입
  constructor(
    @InjectModel(Board)
    private readonly BoardEntity : typeof Board
  ) {}

  // DTO로 받아와서 메서드로 sql에 저장
  async create(createBoardDto: CreateBoardDto, category:string): Promise<Board> {
    try {
      const { boardTitle, boardContent, uid, unickname, boardFile } = createBoardDto;
      console.log(boardTitle, boardContent, uid, unickname, boardFile)
      return await this.BoardEntity.create({
        boardTitle, boardContent, uid, unickname, boardFile, categories: category
      })
    } catch (err) {
      if(err.message === "SequelizeForeignKeyConstraintError") {
        throw new Error("ForeignKeyConstraintError");
      }
      throw err;
    }
  }

  // 모든 게시물을 가져온다.
  async findAll(limit : number, offset : number, category?: string): Promise<Board[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;
    const whereCondition : any = category ? {categories:category} : {}; 

    return await this.BoardEntity.findAll({
      where : whereCondition,
      limit : safeLimit,
      offset : safeOffset,
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

}
