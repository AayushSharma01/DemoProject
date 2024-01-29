import { BadRequestException, Headers, Inject, Injectable, Req, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from './auth.user.model';
import { LoginDto, UserDto } from 'src/dto/auth-user-dto';
import * as bcrpyt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlockUserDto } from 'src/dto/block-user-dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
 
@UseInterceptors(CacheInterceptor)
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthUser.name)
        private authUserModel: Model<AuthUser>,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheService: Cache  
    ) { }

    async signup(user: UserDto): Promise<any> {
        if(user.role!=='user' && user.role!=='admin'){
            throw new BadRequestException({message:'choose of one user and admin'});
        }

        const existingUser = await this.authUserModel.findOne({ email: user.email });
        if (existingUser) {
            throw new BadRequestException({ message: 'user email already exists..' })
        }

        if (user.confrimePassword !== user.password) {
            throw new BadRequestException({ message: 'enter same password and confrime Password' })
        }

        const hashPassword = await bcrpyt.hashSync(user.password, 10);

        const response = await this.authUserModel.create({
            name: user.name,
            email: user.email,
            password: hashPassword,
            role:user.role,
            isBlocked:false,
            isLogin:false
        });

        const result = await response.save();
         
        await this.cacheService.set(result._id.toString() , {"name":result.name});
    
        return result;

    }

    async signin(user: LoginDto ,  request:Request):Promise<any> {
        const userData = await this.authUserModel.findOne({ email: user.email })
        //  console.log(userData)
        if (!userData) {
            throw new BadRequestException({ message: 'user not exists..' })
        }

        if(userData.isBlocked){
            throw new UnauthorizedException({meassage:'user is blocked by admin'});
        }

        const isSame = await bcrpyt.compare(user.password, userData.password);
        
        if (!isSame) {
            throw new UnauthorizedException({message:'password doesnot match.'})
        }
        userData.isLogin = true;
        await this.authUserModel.findByIdAndUpdate(userData._id , userData)
        const payload = { _id:userData._id , role:userData.role};
        const token = await this.jwtService.signAsync(payload);
        await this.cacheService.set(userData._id.toString() ,  userData);

        return {
            message:"signIn is successfully",
            token: token
        };

         
    }

    async blockUser(user:BlockUserDto):Promise<any>{
        const exitingUser = await this.authUserModel.findOne({email:user.email});
        if(!exitingUser){
            throw new BadRequestException({ message: 'user not exists..' })
        }
        exitingUser.isBlocked = true;
        exitingUser.isLogin = false;

        await this.authUserModel.findByIdAndUpdate(exitingUser._id , exitingUser);
        await this.cacheService.del(exitingUser._id.toString());
        return {
            message:'user is blocked'
        }

    }

    async unblockUser(user:BlockUserDto):Promise<any>{
        const exitingUser = await this.authUserModel.findOne({email:user.email});
        if(!exitingUser){
            throw new BadRequestException({ message: 'user not exists..' })
        }
        exitingUser.isBlocked = false;
        await this.authUserModel.findByIdAndUpdate(exitingUser._id , exitingUser);
        return {
            message:'user is blocked'
        }

    }
}
