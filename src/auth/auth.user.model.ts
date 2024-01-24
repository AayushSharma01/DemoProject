import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class AuthUser{
    @Prop()
    name:string

    @Prop()
    email:string

    @Prop()
    password:string

    @Prop()
    role:string
    
    @Prop()
    isBlocked:boolean

    @Prop()
    isLogin:boolean
}

export const authUserSchema = SchemaFactory.createForClass(AuthUser);