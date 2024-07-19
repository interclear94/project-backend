import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IBoard } from './board.model';
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
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const {boardTitle, boardContent, uid, unickname, boardFile, category} = createBoardDto;
    return await this.BoardEntity.create({
      boardTitle, boardContent, uid, unickname, boardFile, categories:category
    })
  }

  async findAll(limit : number, offset : number): Promise<Board[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;
    return await this.BoardEntity.findAll({
      limit : safeLimit,
      offset : safeOffset,
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  async getCategoryContent(categories : string, limit : number, offset : number) : Promise<Board[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;
    
    return await this.BoardEntity.findAll({
      where: {categories},
      limit: safeLimit,
      offset : safeOffset,
      order: [['createdAt', 'DESC']]
    })
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
