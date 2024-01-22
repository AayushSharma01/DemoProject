import { Injectable } from '@nestjs/common';
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
        try {
            return await this.postModel.find(query);
        } catch (error) {
            console.log(error)

        }
    }

    async getPost(id: string): Promise<postDto> {
        try {
            return await this.postModel.findById(id);
        } catch (error) {
            console.log(error)
        }
    }

    async createPost(post: postDto): Promise<postDto> {
        try {
            const res = await this.postModel.create(post);
            const result = res.save();
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async updatePost(post: postDto, id: string): Promise<postDto> {
        try {
            await this.postModel.findByIdAndUpdate(id, post);
            return this.postModel.findById(id);
        } catch (error) {
            console.log(error)
        }
    }

    async deletPost(id: string): Promise<postDto> {
        try {
            return await this.postModel.findByIdAndDelete(id);

        } catch (error) {
            console.log(error)
        }
    }

}
