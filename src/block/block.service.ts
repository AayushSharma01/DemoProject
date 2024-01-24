import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockUser } from './block.model';
import { BlockUserDto } from 'src/dto/block-user-dto';

@Injectable()
export class BlockService {
    constructor(
        @InjectModel(BlockUser.name)
        private blockModel:Model<BlockUser>
    ){}

    async blockUser(user:BlockUserDto):Promise<any>{
       const existingUser = await this.blockModel.findOne({email:user.email})
        if(existingUser) {
            throw new BadRequestException({message:'user already block'});
        }

       const result =  await this.blockModel.create({email:user.email})
       return result.save();
    }

    async unblockUser(user:BlockUserDto):Promise<any>{
        const existingUser = await this.blockModel.findOne({email:user.email})
        if(!existingUser){
            throw new BadRequestException({message:'User does not in blocklist'});
        }

        return await this.blockModel.deleteOne({email:user.email});
    }

    async sreachBlockUser(user:BlockUserDto):Promise<{exist:boolean}>{
        const  existingUser = await this.blockModel.findOne({email:user.email});
        if(existingUser){
            return {exist:true};
        }else{
            return {exist:false};
        }

    }
}
