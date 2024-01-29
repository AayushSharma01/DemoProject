import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './posts.model';
import { Model } from 'mongoose';
import { postDto } from 'src/dto/post-dto';
import { PostQuery } from 'src/Query';
import { UsersService } from 'src/users/users.service';
import { title } from 'process';
import { types } from 'util';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<Post>,
        private usersService:UsersService
    ) { }

    async getPosts(query: PostQuery): Promise<postDto[]> {

        const res = await this.postModel.find(query);
       
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);

        
 
        return res;

    }

    async getPost(id: string): Promise<any> {

        const res = await this.postModel.findById(id);
        
        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`);

       const userDetails =  await this.usersService.getUserDetlail(res.userId);
        const PostRes = {
             _id:res._id,
             title:res.title,
             body:res.body,
             __v:res.__v,
             user:userDetails[0]
        }
        return PostRes;
    }

    async createPost(post: postDto): Promise<postDto> {

        const res = await this.postModel.create(post);
        const result = res.save();
        return result;

    }

    async updatePost(post: postDto, id: string): Promise<postDto> {

        await this.postModel.findByIdAndUpdate(id, post);
        return this.postModel.findById(id);

    }

    async deletPost(id: string): Promise<postDto> {

        return await this.postModel.findByIdAndDelete(id);


    }

}
