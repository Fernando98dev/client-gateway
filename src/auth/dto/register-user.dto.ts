import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    name!: string;


    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}