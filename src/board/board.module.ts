import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';

@Module({
  imports: [SequelizeModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService],
  exports:[BoardModule]
})
export class BoardModule {}
