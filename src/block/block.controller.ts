import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlockUserDto } from 'src/dto/block-user-dto';
import { BlockService } from './block.service';

@Controller()
export class BlockController {

    constructor(private blockService:BlockService){}
    @UseGuards(AuthGuard())
    @Post('block')
    async blockUser(
        @Body()
        user:BlockUserDto
        ):Promise<any>{
        return await this.blockService.blockUser(user);
    }

    
    @UseGuards(AuthGuard())
    @Post('unblock')
    async unblockUser(
        @Body()
        user:BlockUserDto
        ):Promise<any>{
        return await this.blockService.unblockUser(user);
    }

}
