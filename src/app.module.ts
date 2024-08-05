import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DetailPageModule } from './detail-page/detail-page.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    BoardModule,
    SequelizeModule.forRoot({
    dialect: "mysql",
    host: process.env.MYSQL_USERHOST,
    port: parseInt(process.env.MYSQL_USWERPORT),
    username: process.env.MYSQL_USERNAME, // 나중에 수정
    password: process.env.MYSQL_USERPW , // 나중에 수정
    database: process.env.MYSQL_USWERDB,
    sync:{force: false},
    autoLoadModels : true,
    synchronize : true,
    logging : false,
  }),
  DetailPageModule,
  CommentModule,
  LikesModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "static")
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
