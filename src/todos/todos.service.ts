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
        const stages = [];
        if (query.userId) {
            stages.push({
                $match: {
                    userId: query.userId
                }
            })
        }
        if (query.title) {
            stages.push({
                $match: {
                    title: query.title
                }
            })
        }
        if (query.completed) {
            stages.push({
                $match: {
                    completed: query.completed
                }
            })
        }

        stages.push({
            $set: {
                userId: { "$toObjectId": "$userId" }
            }
        })

        stages.push({
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id",
                as: "creator"
            }
        })

        stages.push({
            $project: {
                userId: 0
            }
        })

        const res = this.todoModel.aggregate(stages)
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;


    }

    async getTodo(id: string): Promise<any[]> {

        const res = await this.todoModel.aggregate([
            {$match:{
                userId:id
            }},
            {
                $set:{
                    userId:{"$toObjectId":"userId"}
                }
            },
            {$lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"creator"
            }},
            {
               $project:{
                userId:0
               }
            }
        ]);

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
