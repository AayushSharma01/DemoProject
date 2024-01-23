import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { MongooseModule } from '@nestjs/mongoose';
import { albumSchema } from './albums.model';
import { AblumInterceptor } from './albums.interceptor';

@Module({
  imports:[MongooseModule.forFeature([{name:'Album' , schema:albumSchema}])],
  controllers: [AlbumsController],
  providers: [AlbumsService , AblumInterceptor]
})
export class AlbumsModule {}
