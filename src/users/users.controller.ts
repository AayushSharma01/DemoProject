import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from 'src/dto/user-dto';
import { UserQuery } from 'src/Query';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    getsUsers(
        @Query() query: UserQuery
    ): Promise<userDto[]> {
        return this.userService.getUsers(query);
    }

    @Get('/:id')
    getUser(
        @Param('id') id: string
    ): Promise<userDto> {
        return this.userService.getUser(id)

    }
    
    @Post()
    createUser(
        @Body()
        user: userDto
    ): Promise<userDto> {
        return this.userService.createUser(user);

    }

    @Put('/:id')
    updateUser(
        @Body()
        user: userDto,

        @Param('id') id: string
    ): Promise<userDto> {
        return this.userService.updateUser(user, id)

    }

    @Delete('/:id')
    DeletUser(
        @Param('id') id: string
    ): Promise<userDto> {
        return this.userService.deletUser(id)
    }

}
