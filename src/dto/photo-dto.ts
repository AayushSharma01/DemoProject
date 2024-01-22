import { IsNotEmpty, IsString } from "class-validator"

export class photoDto{
    @IsNotEmpty()
    @IsString()
    albumId:string

    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    url:string

    @IsString()
    thumbnailUrl:string
}