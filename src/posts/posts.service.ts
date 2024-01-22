import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './posts.model';
import { Model } from 'mongoose';
import { postDto } from 'src/dto/post-dto';
import { PostQuery } from 'src/Query';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<Post>
    ) { }

    async getPosts(query: PostQuery): Promise<postDto[]> {

        const res = await this.postModel.find(query);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;

    }

    async getPost(id: string): Promise<postDto> {

        const res = await this.postModel.findById(id);
        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`);
        return res;
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
