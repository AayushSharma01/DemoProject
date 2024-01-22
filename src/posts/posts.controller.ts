import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { postDto } from "src/dto/post-dto";
import { PostQuery } from "src/Query";


@Controller()
export class PostController{
    constructor(private postsService:PostsService){}

     
    @Get('posts')
    async getPosts(
        @Query() query:PostQuery
    ):Promise<postDto[]>{
        return this.postsService.getPosts(query);
    }


    @Get('posts/:id')
    async getPost(
        @Param('id')id:string
    ){
        return this.postsService.getPost(id);

    }

    @Get('users/:userId/posts')
    async getUsersPost(
        @Param('userId')userId:string,
        @Query()
        query:PostQuery
    ){
        query.userId = userId;
        return this.postsService.getPosts(query);
        
    }

    @Post('posts')
    async createPost(
        @Body()
        post:postDto
    ):Promise<postDto>{
        return this.postsService.createPost(post);
    }

    @Put('posts/:id')
    async updatePost(
        @Body()
        post:postDto,
        @Param('id')id:string
    ){
        return this.postsService.updatePost(post , id);

    }
    @Delete('posts/:id')
    async deletPost(
        @Param('id')id:string
    ){
        return this.postsService.deletPost(id);

    }

}