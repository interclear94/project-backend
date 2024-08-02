import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import  cookie from'cookie-parser';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역설정
    }),
    HttpModule,
    SequelizeModule.forRoot({
    dialect: "mysql",
    host: process.env.MYSQL_USERHOST,
    port: parseInt(process.env.MYSQL_USERPORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_USERPW,
    database: process.env.MYSQL_USERDB,
    sync:{force: false},
    autoLoadModels : true,
    synchronize : true,
  }), UsersModule, AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(cookie()).forRoutes("*");
  }
}
