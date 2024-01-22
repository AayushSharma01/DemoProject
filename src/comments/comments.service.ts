import { Injectable, NotFoundException } from '@nestjs/common';
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


        const res = await this.commentModel.find(query);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;

    }
    async getComment(id: string): Promise<CommentDto> {



        const res = await this.commentModel.findById(id);
        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`)

        return res;


    }

    async postComment(comment: CommentDto): Promise<CommentDto> {


        const res = await this.commentModel.create(comment);
        const result = res.save();
        return result;

    }



    async updateComment(comment: CommentDto, id: string): Promise<CommentDto> {


        await this.commentModel.findByIdAndUpdate(id, comment);
        return this.commentModel.findById(id);


    }

    async deletComment(id: string): Promise<CommentDto> {


        return await this.commentModel.findByIdAndDelete(id);


    }
}
