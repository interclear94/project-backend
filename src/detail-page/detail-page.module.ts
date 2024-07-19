import { Module } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { DetailPageController } from './detail-page.controller';

@Module({
  controllers: [DetailPageController],
  providers: [DetailPageService],
})
export class DetailPageModule {}
