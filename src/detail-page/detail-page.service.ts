import { Injectable } from '@nestjs/common';
import { CreateDetailPageDto } from './dto/create-detail-page.dto';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DetailPageService {
  constructor(
    @InjectModel(Board)
    private readonly BoardEntity: typeof Board
  ) {}

  create(createDetailPageDto: CreateDetailPageDto) {
    return 'This action adds a new detailPage';
  }

  findAll() {
    return `This action returns all detailPage`;
  }

  getContent(id: number, category:string) {
    return this.BoardEntity.findOne({ where : {id, categories : category}})
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

  remove(id: number) {
    return `This action removes a #${id} detailPage`;
  }
}
