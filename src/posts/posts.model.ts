import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Post{
    @Prop()
    userId:string

    @Prop()
    title:string

    @Prop()
    body:string

}

export const postSchema = SchemaFactory.createForClass(Post)