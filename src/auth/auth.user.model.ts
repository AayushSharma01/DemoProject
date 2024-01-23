import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class AuthUser{
    @Prop()
    name:string

    @Prop()
    email:string

    @Prop()
    password:string

    @Prop()
    role:string
}

export const authUserSchema = SchemaFactory.createForClass(AuthUser);