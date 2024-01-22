import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { AddressDto, CompandDetailsDto } from "src/users/users.model"
 

export class userDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsEmail()
    email:string

     
    address:AddressDto
 
    @IsString()
    phone:string
    
    @IsString()
    website:string
    
    company:CompandDetailsDto
}