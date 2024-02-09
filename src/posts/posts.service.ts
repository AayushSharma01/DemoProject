import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './posts.model';
import mongoose, { Model } from 'mongoose';
import { postDto } from 'src/dto/post-dto';
import { PostQuery } from 'src/Query';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
  ) { }

  async getPosts(query: PostQuery): Promise<any> {
    let stages = [];
    if(query.userId){
      stages.push({$match:{
        userId:query.userId
      }})
    }
    if(query.body){
      stages.push({$match:{
        body:query.body
      }})
    }
    if(query.title){
      stages.push({$match:{
        title:query.title
      }})
    }

    stages.push( {
      $set:{
       userId:{ "$toObjectId": "$userId", }
      }
   })

   stages.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  })
  stages.push({$project:{"userId":0}})
    console.log(stages)
    const posts = await this.postModel.aggregate(stages);

    if (!posts)
      throw new NotFoundException(`Data for give ${query} does not exit.`);

    return posts;
  }

  async getPost(id: string): Promise<any> {
    const _id = new mongoose.Types.ObjectId(id);
    const res = await this.postModel.aggregate([
      {
         $set:{
          userId:{ "$toObjectId": "$userId", }
         }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {$project:{"userId":0}},
      { $match: { _id: _id } }]);

    if (!res) throw new NotFoundException(`Data for give ${id} does not exit.`);
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
