import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class AuthUser{
    @Prop()
    name:string

    @Prop()
    email:string

    @Prop()
    password:string
}

export const authUserSchema = SchemaFactory.createForClass(AuthUser);