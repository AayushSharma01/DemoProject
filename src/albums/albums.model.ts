import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Album{
    @Prop()
    userId:string

    @Prop()
    title:string

}

export const albumSchema = SchemaFactory.createForClass(Album);