import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
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
      host: process.env.MYSQL_USERHOST,
      port: parseInt(process.env.MYSQL_USERPORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_USERPW,
      database: process.env.MYSQL_USERDB,
      sync: { force: false },
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    DetailPageModule,
    CommentModule,
    LikesModule,
    BoardModule,
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
