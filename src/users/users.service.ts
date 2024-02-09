import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { userDto } from 'src/dto/user-dto';
import { UserQuery } from 'src/Query';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel = Model<User>
    ) { }

    async getUsers(query: UserQuery): Promise<userDto[]> {
        const res = this.userModel.find(query);
        if(!res) 
         throw new NotFoundException(`Data for give ${query} does not exit.`)
        return res;
    }

    async getUser(id: string): Promise<userDto> {
        const res = this.userModel.findById(id);
        if(!res) 
        throw new NotFoundException(`Data for give ${id} does not exit.`)
        return res;
    }

    async createUser(user: userDto): Promise<userDto> {
            const res = await this.userModel.create(user)
            const result = res.save()
            return result;
    }

    async updateUser(user: userDto, id: string): Promise<userDto> {
            await this.userModel.findByIdAndUpdate(id, user);
            const res = this.userModel.findById(id)
            return res;

        
    }

    async deletUser(id: string): Promise<userDto> {
            const res = this.userModel.findByIdAndDelete(id)
            return res;
    }

}
