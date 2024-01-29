import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy  , ExtractJwt} from "passport-jwt";
import { AuthUser } from "./auth.user.model";
import { Model } from "mongoose";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

class UserInfoDto{
    isLogin:boolean
    isBlock:boolean
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
   constructor(
    @InjectModel(AuthUser.name)
    private authUserModel:Model<AuthUser>,
    @Inject(CACHE_MANAGER) private cacheService:Cache
   ){super({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRECT}
   )}
   
   async validate(payload:{_id:string , role:string}){
    const {_id} = payload;
    const userInfo:UserInfoDto= await this.cacheService.get(_id.toString());
     
    if(!userInfo.isLogin){
        throw new UnauthorizedException('login first to acess this routes')
    }

    if(payload.role!=='admin'){
        throw new UnauthorizedException({message:'Role is not admin..'})
    }
     return userInfo;
    
   }

}