import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.model';
import { CommentDto } from 'src/dto/comment-dto';
import { CommentQuery } from 'src/Query';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name)
        private commentModel: Model<Comment>
    ) { }

    async getComments(query: CommentQuery): Promise<CommentDto[]> {

        try {
            return await this.commentModel.find(query);

        } catch (error) {
            console.log(error)
        }
    }

    async postComment(comment: CommentDto): Promise<CommentDto> {

        try {
            const res = await this.commentModel.create(comment);
            const result = res.save();
            return result;

        } catch (error) {
            console.log(error)

        }
    }

    async getComment(id: string): Promise<CommentDto> {

        try {
            return await this.commentModel.findById(id);

        } catch (error) {
            console.log(error)

        }
    }

    async updateComment(comment: CommentDto, id: string): Promise<CommentDto> {

        try {
            await this.commentModel.findByIdAndUpdate(id, comment);
            return this.commentModel.findById(id);

        } catch (error) {
            console.log(error)
        }
    }

    async deletComment(id: string): Promise<CommentDto> {

        try {
            return await this.commentModel.findByIdAndDelete(id);

        } catch (error) {

            console.log(error)
        }
    }
}
