import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DetailPageModule } from 'src/detail-page/detail-page.module';

@Module({
  imports: [DetailPageModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
