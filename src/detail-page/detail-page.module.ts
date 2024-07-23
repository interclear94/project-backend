import { Module } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { DetailPageController } from './detail-page.controller';
import { Board } from 'src/board/entities/board.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentModule } from 'src/comment/comment.module';
import { Reply } from 'src/comment/entities/comment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Board, Reply]), CommentModule],
  controllers: [DetailPageController],
  providers: [DetailPageService],
})
export class DetailPageModule {}
