import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query,  UseGuards,  UseInterceptors } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { postDto } from "src/dto/post-dto";
import { PostQuery } from "src/Query";
import { PostInterceptor } from "./posts.interceptor";
import { AuthGuard } from "@nestjs/passport";

@UseInterceptors(PostInterceptor)
@Controller()
export class PostController{
    constructor(private postsService:PostsService){}

   @Get('posts')
    async getPosts(
        @Query() query:PostQuery,
        @Headers()
        header:any
    ):Promise<postDto[]>{
    //     console.log(header.jwttoken)
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

    @UseGuards(AuthGuard())
    @Post('posts')
    async createPost(
        @Body()
        post:postDto
    ):Promise<postDto>{
        return this.postsService.createPost(post);
    }

    @UseGuards(AuthGuard())
    @Put('posts/:id')
    async updatePost(
        @Body()
        post:postDto,
        @Param('id')id:string
    ){
        return this.postsService.updatePost(post , id);

    }
    
    @UseGuards(AuthGuard())
    @Delete('posts/:id')
    async deletPost(
        @Param('id')id:string
    ){
        return this.postsService.deletPost(id);

    }

}