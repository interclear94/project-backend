import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Board, User])],
  controllers: [BoardController],
  providers: [BoardService, UsersService, JwtService],
  exports:[BoardModule]
})
export class BoardModule {}
