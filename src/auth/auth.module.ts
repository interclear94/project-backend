import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwTStrategy } from './strategy/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.Jwt_Key,
      signOptions: {expiresIn: '5m'},
    }),SequelizeModule.forFeature([User])
  ],
  providers: [AuthService ,UsersService, JwTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
