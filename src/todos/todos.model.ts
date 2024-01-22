import { Schema , Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Todo{
     @Prop()
     userId:string

     @Prop()
     title:string

     @Prop()
     completed:boolean
}

export const todoSchema = SchemaFactory.createForClass(Todo)