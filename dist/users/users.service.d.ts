import { JwtService } from '@nestjs/jwt';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    private readonly saltRounds;
    create(createUserDto: CreateUserDto): Promise<User>;
    createCheck(createUserDto: CreateUserDto): Promise<void>;
    validateUser(loginUserDto: LoginUserDto): Promise<User>;
    getUserById(userdata: any): Promise<User>;
    userIdCheck(uid: string): Promise<User>;
    verifyToken(token: string): Promise<any>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
    getUserInfo(uid: string): Promise<User>;
}
