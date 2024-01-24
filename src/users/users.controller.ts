import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from 'src/dto/user-dto';
import { UserQuery } from 'src/Query';
import { UserInterceptor } from './users.interceptor';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(UserInterceptor)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    getsUsers(
        @Query() query: UserQuery,
        @Req() request:Request
    ): Promise<userDto[]> {
        return this.userService.getUsers(query);
    }

    @Get('/:id')
    getUser(
        @Param('id') id: string
    ): Promise<userDto> {
        return this.userService.getUser(id)

    }
    
    @UseGuards(AuthGuard())
    @Post()
    createUser(
        @Body()
        user: userDto
    ): Promise<userDto> {
        return this.userService.createUser(user);

    }

    @UseGuards(AuthGuard())
    @Put('/:id')
    updateUser(
        @Body()
        user: userDto,

        @Param('id') id: string
    ): Promise<userDto> {
        return this.userService.updateUser(user, id)

    }

    @UseGuards(AuthGuard())
    @Delete('/:id')
    DeletUser(
        @Param('id') id: string
    ): Promise<userDto> {
        return this.userService.deletUser(id)
    }

}
