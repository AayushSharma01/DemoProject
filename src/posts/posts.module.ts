import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './posts.model';
import { PostInterceptor } from './posts.interceptor';
import { userSchema } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{name:"Post" , schema:postSchema} , {name:"User" , schema:userSchema}]) , UsersModule],
  controllers:[PostController],
  providers: [PostsService , PostInterceptor],
})
export class PostsModule {}
