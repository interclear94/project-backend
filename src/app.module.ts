import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DetailPageModule } from './detail-page/detail-page.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [BoardModule, SequelizeModule.forRoot({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root", // 나중에 수정
    password: "189189", // 나중에 수정
    database: "projectdatabase",
    sync:{force: false},
    autoLoadModels : true,
    synchronize : true
  }), DetailPageModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
