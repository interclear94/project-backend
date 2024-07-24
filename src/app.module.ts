import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './board/entities/board.entity';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BoardModule, SequelizeModule.forRoot({
    dialect: "mysql",
    host: process.env.USERHOST,
    port: parseInt(process.env.USERPORT),
    username: process.env.USERNAME, // 나중에 수정
    password: process.env.USERPW, // 나중에 수정
    database: process.env.USERDB,
    sync:{force: false},
    autoLoadModels : true,
    synchronize : true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
