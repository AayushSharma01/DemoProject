import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from './auth.user.model';
import { LoginDto, UserDto } from 'src/dto/auth-user-dto';
import * as bcrpyt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthUser.name)
        private authUserModel: Model<AuthUser>,
        private jwtService: JwtService
    ) { }

    async signup(user: UserDto): Promise<any> {
        console.log(user);
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
        });

        const result = await response.save();
        return result;

    }

    async signin(user: LoginDto) {
        const userData = await this.authUserModel.findOne({ email: user.email })

        if (!userData) {
            throw new BadRequestException({ message: 'user not exists..' })
        }
        const isSame = await bcrpyt.compare(user.password, userData.password)
        if (!isSame) {
            throw new UnauthorizedException()
        }
        const payload = { sub: userData._id, username: userData.name };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };

    }
}
