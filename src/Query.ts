import { IsOptional, IsString } from "class-validator";
import { AddressDto, CompandDetailsDto } from "./users/users.model";

export class TodoQuery{
    @IsOptional()
    @IsString()
    userId:string

    @IsOptional()
    @IsString()
    title:string

    @IsOptional()
    completed:boolean
}

export class PostQuery{
    @IsOptional()
    userId:string

    @IsOptional()
    title:string
    
    @IsOptional()
    body:string
}

export class PhotoQuery{
    @IsOptional()
    albumId:string

    @IsOptional()
    title:string

    @IsOptional()
    url:string

    @IsOptional()
    thumbnailUrl:string
    
}

export class CommentQuery{
    @IsOptional()
    postId:string

    @IsOptional()
    email:string

    @IsOptional()
    body:string

}

export class AlbumQuery{
    @IsOptional()
    userId:string

    @IsOptional()
    title:string
}

export class UserQuery{
    @IsOptional()
    name:string

    @IsOptional()
    username:string

    @IsOptional()
    email:string

   @IsOptional()
    address:AddressDto

    @IsOptional()
    phone:string

    @IsOptional()
    website:string
    
    @IsOptional()
    company:CompandDetailsDto
}
