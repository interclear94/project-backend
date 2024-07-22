import { Module } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { DetailPageController } from './detail-page.controller';
import { Board } from 'src/board/entities/board.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Board])],
  controllers: [DetailPageController],
  providers: [DetailPageService],
})
export class DetailPageModule {}
