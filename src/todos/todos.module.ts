import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { todoSchema } from './todos.model';


@Module({
  imports:[MongooseModule.forFeature([{name:'Todo' , schema:todoSchema}])],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
