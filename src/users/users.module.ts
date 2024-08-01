import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports : [SequelizeModule.forFeature([User]),HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
