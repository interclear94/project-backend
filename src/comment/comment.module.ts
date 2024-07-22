import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DetailPageModule } from 'src/detail-page/detail-page.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reply } from './entities/comment.entity';

@Module({
  imports: [DetailPageModule, SequelizeModule.forFeature([Reply])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentModule]
})
export class CommentModule {}
