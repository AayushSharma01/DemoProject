import { Injectable } from '@nestjs/common';
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

        try {

            return this.todoModel.find(query)
        } catch (error) {
            console.log(error)
        }

    }

    async getTodo(id: string): Promise<TodoDto> {

        try {
            return await this.todoModel.findById(id);

        } catch (error) {
            console.log(error)
        }
    }

    async getUserTodo(query: TodoQuery): Promise<TodoDto[]> {

        try {
            return await this.todoModel.find(query);

        } catch (error) {
            console.log(error)
        }

    }

    async updateTodo(Todo: TodoDto, id: string): Promise<TodoDto> {
        try {
            await this.todoModel.findByIdAndUpdate(id, Todo);
            return this.todoModel.findById(id);
        } catch (error) {
            console.log(error)
        }
    }

    async createTodo(Todo: TodoDto): Promise<TodoDto> {
        try {
            const res = await this.todoModel.create(Todo);
            const result = res.save();
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async deletTodo(id: string): Promise<TodoDto> {

        try {
            return await this.todoModel.findByIdAndDelete(id);

        } catch (error) {
            console.log(error)
        }
    }


}
