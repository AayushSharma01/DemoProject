import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class BlockUser{
    @Prop()
    email:string
}

export const blockUserSchema = SchemaFactory.createForClass(BlockUser);