import { Module } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { DetailPageController } from './detail-page.controller';
import { Board } from 'src/board/entities/board.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentModule } from 'src/comment/comment.module';
import { Reply } from 'src/comment/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { LikesService } from 'src/likes/likes.service';

@Module({
  imports: [SequelizeModule.forFeature([Board, Reply, Like]), CommentModule],
  controllers: [DetailPageController],
  providers: [DetailPageService, LikesService],
})
export class DetailPageModule {}
