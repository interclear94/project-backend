import { Injectable } from '@nestjs/common';
import { CreateDetailPageDto } from './dto/create-detail-page.dto';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/board/entities/board.comment.entity';

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
    return this.BoardEntity.findOne({ where : {id, categories : category}, include:[Comment] })
  }

  update(id: number, updateDetailPageDto: UpdateDetailPageDto) {
    return `This action updates a #${id} detailPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailPage`;
  }
}
