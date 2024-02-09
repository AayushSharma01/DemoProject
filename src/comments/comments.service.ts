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

    async getComments(query: CommentQuery): Promise<any[]> {

        const stages = [];
        if (query.postId) {
            stages.push({
                $match: {
                    postId: query.postId
                }
            })
        }
        if (query.body) {
            stages.push({
                $match: {
                    body: query.body
                }
            })
        }
        if (query.email) {
            stages.push({
                $match: {
                    email: query.email
                }
            })
        }

        stages.push({
            $set: {
                postId: { "$toObjectId": "$postId" }
            }
        })

        stages.push({
            $lookup: {
                from: 'posts',
                localField: "postId",
                foreignField: "_id",
                as: "post"
            }
        })

        stages.push({
            $project: {
                postId: 0
            }
        })
        const res = await this.commentModel.aggregate(stages)

        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;

    }
    async getComment(id: string): Promise<any[]> {



        const res = await this.commentModel.aggregate([
            {
                $set: {
                    postId: { "$toObjectId": "postId" }
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: "postId",
                    foreignField: "_id",
                    as: "post"
                }
            },
            {
                $project: {
                    postId: 0
                }
            }

        ])
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
