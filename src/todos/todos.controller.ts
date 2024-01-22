import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto } from 'src/dto/todo-dto';
import { TodoQuery } from 'src/Query';

@Controller()
export class TodosController{
    constructor(private todosService:TodosService){}
    
    @Get('todos')
    async getTodos(
        @Query()
        query:TodoQuery,
        @Query('completed' , )completed:boolean
    ):Promise<TodoDto[]>{
        if(completed === true || completed === false)
         query.completed = completed

        return this.todosService.getTodos(query);
    }

    @Get('todos/:id')
    async getTodo(
        @Param('id')id:string
    ){
        return this.todosService.getTodo(id);

    }
    
    @Get('users/:userId/todos')
    async getUserTodo(
        @Param('userId') userId:string  ,
        @Query()
        query:TodoQuery,
        @Query('completed' , )completed:boolean
    ):Promise<TodoDto[]>{
        query.userId = userId
        if(completed === true || completed === false)
         query.completed = completed
         return this.todosService.getUserTodo(query); 
    }

    @Post('todos')
    async createTodo(
        @Body()
        Todo:TodoDto
    ):Promise<TodoDto>{
        return this.todosService.createTodo(Todo);
    }
       
    @Put('todos/:id')
    async updateTodo(
        @Body()
        Todo:TodoDto,
        @Param('id')id:string
    ){
        return this.todosService.updateTodo(Todo , id);

    }

    @Delete('todos/:id')
    async deletTodo(
        @Param('id')id:string
    ){
        return this.todosService.deletTodo(id);

    }

}
