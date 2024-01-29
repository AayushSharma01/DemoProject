import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UserDto } from 'src/dto/auth-user-dto';
import { Request } from 'express';
import { BlockUserDto } from 'src/dto/block-user-dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
     constructor (private authService: AuthService){}

     @Post('/signup')
     async signup(
        @Body()
        user:UserDto
     ):Promise<any>{
         return await this.authService.signup(user);
     }
     

     @Post('/signin')
     async signin(
        @Body()
        user:LoginDto,
        @Req()
        request:Request
     ):Promise<any>{
        return  await this.authService.signin(user , request);
     }
     
     @UseGuards(AuthGuard())
     @Post('block')
     async  blockUser(
      @Body()
      userData:BlockUserDto
     ):Promise<any>{
        return this.authService.blockUser(userData)
     }

     @UseGuards(AuthGuard())
     @Post('block')
     async  unblockUser(
      @Body()
      userData:BlockUserDto
     ):Promise<any>{
        return this.authService.unblockUser(userData)
     }

}
