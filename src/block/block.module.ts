import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { MongooseModule } from '@nestjs/mongoose';
import { blockUserSchema } from './block.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'BlockUser', schema:blockUserSchema}])],
  controllers: [BlockController],
  providers: [BlockService],
  exports:[BlockService]
})
export class BlockModule {}
