import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoSchema } from './photos.model';
import { PhotoIntercepter } from './photos.interceptor';

@Module({
  imports:[MongooseModule.forFeature([{name:"Photo" , schema:PhotoSchema}])],
  controllers: [PhotosController],
  providers: [PhotosService , PhotoIntercepter]
})
export class PhotosModule {}
