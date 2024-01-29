import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  userSchema } from './users.model';
import { UserInterceptor } from './users.interceptor';

@Module({
  imports:[MongooseModule.forFeature([{name:'User' , schema:userSchema}])],
  controllers: [UsersController],
  providers: [UsersService , UserInterceptor],
  exports:[UsersService]
})
export class UsersModule {}
