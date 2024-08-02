import { Res,Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res()res:Response) {
    try {
    const user = await this.authService.validateUser(loginUserDto.uid, loginUserDto.upw);

    const token = this.authService.login(user);
    const date= new Date();

    console.log(token);

    date.setDate(date.getDate()+1);
    const date2  = new Date(date)

    res.cookie("token",token,{ httpOnly:true,expires: date })
    console.log(res.statusCode);
    console.log(res);
    return res.status(200).send();

  } catch(err) {

  }
  }
}
