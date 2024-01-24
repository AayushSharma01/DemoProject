import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy  , ExtractJwt} from "passport-jwt";
import { AuthUser } from "./auth.user.model";
import { Model } from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
   constructor(
    @InjectModel(AuthUser.name)
    private authUserModel:Model<AuthUser>
   ){super({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRECT}
   )}
   
   async validate(payload:{_id:string , role:string}){
    const {_id} = payload;
    const user = await this.authUserModel.findById(_id)
    if(!user){
        throw new UnauthorizedException('login first to acess this routes')
    }

    if(user.role!=='admin'){
        throw new UnauthorizedException('Role is not admin..')
    }

    return user;

   }

}