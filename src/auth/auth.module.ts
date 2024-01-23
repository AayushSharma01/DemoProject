import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authUserSchema } from './auth.user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { authInterceptor } from './auth.interceptor';

@Module({
  imports:[MongooseModule.forFeature([{name:'AuthUser' , 
schema:authUserSchema}]),
ConfigModule.forRoot(),
JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRECT,
  signOptions: { expiresIn: '3d' },
})],
  controllers: [AuthController],
  providers: [AuthService , authInterceptor]
})
export class AuthModule {}
