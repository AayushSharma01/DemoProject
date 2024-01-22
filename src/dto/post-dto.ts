import { IsAlpha, IsNotEmpty, IsString } from "class-validator"

export class postDto{
    @IsNotEmpty()
    @IsString()
    userId:string

    @IsString()
    title:string

    body:string
}