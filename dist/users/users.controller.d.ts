import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/users.entity").User>;
    getProfile(req: Request): Promise<import("./entities/users.entity").User>;
    getProfileModify(req: Request): Promise<import("./entities/users.entity").User>;
    updateUser(file: Express.Multer.File, res: Response, req: Request, updateUserDto: UpdateUserDto): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
