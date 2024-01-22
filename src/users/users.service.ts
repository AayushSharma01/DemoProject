import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';
import { userDto } from 'src/dto/user-dto';
import { UserQuery } from 'src/Query';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel = Model<User>
    ) { }

    async getUsers(query: UserQuery): Promise<userDto[]> {
        try {
            const res = this.userModel.find(query);
            return res;

        } catch (error) {
            console.log(error)
        }
    }

    async getUser(id: string): Promise<userDto> {
        try {
            const res = this.userModel.findById(id);
            return res;

        } catch (error) {
            console.log(error)
        }
    }

    async createUser(user: userDto): Promise<userDto> {
        try {
            const res = await this.userModel.create(user)
            const result = res.save()
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(user: userDto, id: string): Promise<userDto> {
        try {
            await this.userModel.findByIdAndUpdate(id, user);
            const res = this.userModel.findById(id)
            return res;

        } catch (error) {
            console.log(error)
        }
    }

    async deletUser(id: string): Promise<userDto> {
        try {
            const res = this.userModel.findByIdAndDelete(id)
            return res;

        } catch (error) {
            console.log(error)
        }
    }



}
