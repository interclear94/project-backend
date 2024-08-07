import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto, res: Response): Promise<void>;
}
