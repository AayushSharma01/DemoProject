import { IsNotEmpty, IsString } from "class-validator"


export class AlbumDto{
    @IsNotEmpty()
    @IsString()
    userId:string

    @IsString()
    title:string

}