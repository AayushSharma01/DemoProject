import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UserDto } from 'src/dto/auth-user-dto';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
     constructor (private authService: AuthService){}

     @Post('/signup')
     async signup(
        @Body()
        user:UserDto
     ):Promise<UserDto>{

         return await this.authService.signup(user);

     }

     @Post('signin')
     async signin(
        @Body()
        user:LoginDto,
        @Req()
        request:Request
     ){
        return await this.authService.signin(user , request);
     }
    
}
