import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from 'src/dto/comment-dto';
import { query } from 'express';
import { CommentQuery } from 'src/Query';

@Controller()
export class CommentsController {
    constructor(private commentService:CommentsService){}

    @Get('comments')
    async getComments(
        @Query() query:CommentQuery
    ):Promise<CommentDto[]>{
        return this.commentService.getComments(query);
    }

    @Get('comments/:id')
    async getComment(
        @Param('id')id:string
    ){
        return this.commentService.getComment(id);

    }

    @Get('posts/postId/comments')
    async getPostComments(
        @Param('postId') postId:string,
        @Query() query: CommentQuery
    ):Promise<CommentDto[]>{
        query.postId = postId;
        return this.commentService.getComments(query);
    }

    @Post('comments')
    async postComment(
        @Body()
        comment:CommentDto
    ):Promise<CommentDto>{
        return this.commentService.postComment(comment);
    }

    
    @Put('comments/:id')
    async updateComment(
        @Body()
        comment:CommentDto,
        @Param('id')id:string
    ){
        return this.commentService.updateComment(comment , id);

    }

    @Delete('comments/:id')
    async deletComment(
        @Param('id')id:string
    ){
        return this.commentService.deletComment(id);

    }
}
