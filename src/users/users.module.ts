import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports : [SequelizeModule.forFeature([User]),
  HttpModule,
  forwardRef(() => AuthModule)
],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
})
export class UsersModule {}
