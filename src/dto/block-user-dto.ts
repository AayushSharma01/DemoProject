import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BlockUserDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string
}