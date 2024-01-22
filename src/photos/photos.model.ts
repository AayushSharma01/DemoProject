import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Photo{
    @Prop()
    albumId:string

    @Prop()
    title:string

    @Prop()
    url:string

    @Prop()
    thumbnailUrl:string
    
}

export const PhotoSchema = SchemaFactory.createForClass(Photo)