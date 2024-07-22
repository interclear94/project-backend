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
    host: "3.36.154.200",
    port: 3306,
    username: "admin", // 나중에 수정
    password: "admin1234", // 나중에 수정
    database: "test",
    sync:{force: false},
    autoLoadModels : true,
    synchronize : true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
