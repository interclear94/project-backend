import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    SequelizeModule.forRoot({
    dialect: "mysql",
    // host: process.env.USERHOST,
    // port: parseInt(process.env.USERPORT),
    // username: process.env.USERNAME, // 나중에 수정
    // password: process.env.USERPW, // 나중에 수정
    // database: process.env.USERDB,
    host: 'localhost',
    port: 3306,
    username: 'root' , // 나중에 수정
    password: 'xodnr1027@', // 나중에 수정
    database: 'uk2',
    sync:{force: false},
    autoLoadModels : true,
    synchronize : true,
  }), UsersModule, AuthModule,
JwtModule.register({
  secret:process.env.Jwt_Key,
  signOptions: {expiresIn: '5m'}
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
