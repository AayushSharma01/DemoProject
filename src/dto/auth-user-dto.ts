import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsStrongPassword()
    password:string;

    @IsNotEmpty()
    confrimePassword:string

    @IsNotEmpty()
    @IsString()
    role:string
    
}

export class LoginDto{
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}