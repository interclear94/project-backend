import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './entities/like.entity';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports:[SequelizeModule.forFeature([Board, Like])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
