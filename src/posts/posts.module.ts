import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './posts.model';

@Module({
  imports:[MongooseModule.forFeature([{name:"Post" , schema:postSchema}])],
  controllers:[PostController],
  providers: [PostsService]
})
export class PostsModule {}
