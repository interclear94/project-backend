import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reply } from './entities/comment.entity';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports: [SequelizeModule.forFeature([Reply, Board])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
