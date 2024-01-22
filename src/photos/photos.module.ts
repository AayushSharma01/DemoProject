import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoSchema } from './photos.model';

@Module({
  imports:[MongooseModule.forFeature([{name:"Photo" , schema:PhotoSchema}])],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
