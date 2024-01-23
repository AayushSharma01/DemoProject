import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { commentSchema } from './comments.model';
import { CommentInterceptor } from './comments.interceptor';

@Module({
  imports:[MongooseModule.forFeature([{name:'Comment' , schema:commentSchema}])],
  controllers: [CommentsController],
  providers: [CommentsService , CommentInterceptor]
})
export class CommentsModule {}
