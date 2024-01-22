import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CommentDto{
    @IsNotEmpty()
    @IsString()
    postId:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    body:string
}