import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(uid: string, pass: string): Promise<any> {
        const loginUserDto: LoginUserDto = { uid, upw: pass };
        const user = await this.usersService.validateUser(loginUserDto);
        if (user) {
            const { upw, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload = { username: user.uid, sub: user.nickname};
        // return {
        //     access_token : this.jwtService.sign(payload)
        // }
        return this.jwtService.sign(payload);
    }
}
