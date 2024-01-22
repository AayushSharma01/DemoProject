import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class TodoDto{
    @IsNotEmpty()
    @IsString()
    userId:string

    @IsString()
    title:string

    @IsNotEmpty()
    @IsBoolean()
    completed:boolean
}
