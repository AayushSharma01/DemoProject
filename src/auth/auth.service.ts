import { BadRequestException, Headers, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from './auth.user.model';
import { LoginDto, UserDto } from 'src/dto/auth-user-dto';
import * as bcrpyt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthUser.name)
        private authUserModel: Model<AuthUser>,
        private jwtService: JwtService
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
            role:user.role
        });

        const result = await response.save();
    
        return result;

    }

    async signin(user: LoginDto ,  request:Request):Promise<{access_token:string}> {
        
        const userData = await this.authUserModel.findOne({ email: user.email })

        if (!userData) {
            throw new BadRequestException({ message: 'user not exists..' })
        }
        const isSame = await bcrpyt.compare(user.password, userData.password)
        if (!isSame) {
            throw new UnauthorizedException()
        }
        const payload = { _id:userData._id};

        return {
            access_token: await this.jwtService.signAsync(payload)
        };



    }

    validate(@Headers() headers:any):boolean{
        console.log(headers)
        return true;
    }
}
