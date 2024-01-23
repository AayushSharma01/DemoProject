import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppInterceptor } from './app.interceptor';
import { AuthModule } from './auth/auth.module';
 

@Module({
  imports: [PostsModule, CommentsModule, AlbumsModule, PhotosModule, TodosModule, UsersModule , 
  ConfigModule.forRoot(),
MongooseModule.forRoot(process.env.DB_URL),
AuthModule , 
],
  controllers: [AppController],
  providers: [AppService , AppInterceptor],
})
export class AppModule {}
