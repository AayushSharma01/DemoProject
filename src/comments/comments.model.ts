import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comment{
    @Prop()
    postId:string

    @Prop()
    email:string

    @Prop()
    body:string

}

export const commentSchema = SchemaFactory.createForClass(Comment)