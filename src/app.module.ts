import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaqModule } from './faq/faq.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import  cookie from'cookie-parser';
import { UsersModule } from './users/users.module';
import { DetailPageModule } from './detail-page/detail-page.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "189189",
      database: "projectdatabase",
      sync: { force: false },
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    DetailPageModule,
    CommentModule,
    LikesModule,
    BoardModule,
    FaqModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(cookie()).forRoutes("*");
  }
}
