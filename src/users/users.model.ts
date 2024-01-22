import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GeoLocationDto{

    @IsString()
    lat:string

    @IsString()
    lng:string
}

export class AddressDto{

    @IsString()
    street:string

    @IsString()
    suite:string

    @IsString()
    city:string

    @IsNotEmpty()
    @IsNumber()
    zipcode:number


    geo:GeoLocationDto

}

export class CompandDetailsDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsString()
    catchPhrase:string

    @IsString()
    bs:string
}

@Schema()
export class User{
    @Prop()
    name:string

    @Prop()
    username:string

    @Prop()
    email:string

    @Prop()
    address:AddressDto

    @Prop()
    phone:string

    @Prop()
    website:string
    
    @Prop()
    company:CompandDetailsDto
}

export const userSchema = SchemaFactory.createForClass(User);