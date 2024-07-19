import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './board/entities/board.entity';
import { User } from './users/entities/users.entity';

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
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
