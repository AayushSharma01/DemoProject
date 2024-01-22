import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todos.model';
import { Model } from 'mongoose';
import { TodoDto } from 'src/dto/todo-dto';
import { TodoQuery } from 'src/Query';


@Injectable()
export class TodosService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<Todo>
    ) { }

    async getTodos(query: TodoQuery): Promise<TodoDto[]> {

        const res = this.todoModel.find(query)
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;


    }

    async getTodo(id: string): Promise<TodoDto> {

        const res = await this.todoModel.findById(id);
        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`)
        return res;
    }

    async getUserTodo(query: TodoQuery): Promise<TodoDto[]> {


        const res = await this.todoModel.find(query);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`)
        return res;



    }

    async updateTodo(Todo: TodoDto, id: string): Promise<TodoDto> {

        const res = this.todoModel.findByIdAndUpdate(id, Todo);
        const result = this.todoModel.findById(id);
        return result

    }

    async createTodo(Todo: TodoDto): Promise<TodoDto> {
        const res = await this.todoModel.create(Todo);
        const result = res.save();
        return result;

    }

    async deletTodo(id: string): Promise<TodoDto> {


        return await this.todoModel.findByIdAndDelete(id);

    }


}
