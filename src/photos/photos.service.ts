import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from './photos.model';
import { Model } from 'mongoose';
import { photoDto } from 'src/dto/photo-dto';
import { PhotoQuery } from 'src/Query';

@Injectable()
export class PhotosService {
    constructor(
        @InjectModel(Photo.name)
        private photoModel: Model<Photo>
    ) { }
    async getPhotos(query: PhotoQuery): Promise<photoDto[]> {


        const res = await this.photoModel.find(query);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;

    }

    async getPhoto(id: string): Promise<photoDto> {


        const res = await this.photoModel.findById(id);
        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`)
        return res;

    }

    async postPhoto(photo: photoDto): Promise<photoDto> {
        
            const res = await this.photoModel.create(photo);
            const result = res.save();
            return result;
         
    }



    async updatePhoto(photo: photoDto, id: string): Promise<photoDto> {
       
            await this.photoModel.findByIdAndUpdate(id, photo);
            return this.photoModel.findById(id);
         
    }

    async deletPhoto(id: string): Promise<photoDto> {
        
        return await this.photoModel.findByIdAndDelete(id);
    }

}
