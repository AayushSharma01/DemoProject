import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './posts.model';
import { PostInterceptor } from './posts.interceptor';

@Module({
  imports:[MongooseModule.forFeature([{name:"Post" , schema:postSchema}])],
  controllers:[PostController],
  providers: [PostsService , PostInterceptor],
})
export class PostsModule {}
