import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    uid : string;

    @IsString()
    @IsNotEmpty()
    upw : string;

    @IsString()
    @IsNotEmpty()
    unickname : string;

    @IsString()
    @IsNotEmpty()
    uemail : string;

    @IsNumber()
    @IsNotEmpty()
    uphone : number;
}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    uid : string;

    @IsString()
    @IsNotEmpty()
    upw : string;
}