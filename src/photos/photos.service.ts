import { Injectable } from '@nestjs/common';
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

        try {
            return await this.photoModel.find(query);

        } catch (error) {
            console.log(error)
        }
    }

    async getPhoto(id: string): Promise<photoDto> {

        try {
            return await this.photoModel.findById(id);
        } catch (error) {
            console.log(error)

        }
    }

    async postPhoto(photo: photoDto): Promise<photoDto> {
        try {
            const res = await this.photoModel.create(photo);
            const result = res.save();
            return result;
        } catch (error) {
            console.log(error)
        }
    }



    async updatePhoto(photo: photoDto, id: string): Promise<photoDto> {
        try {
            await this.photoModel.findByIdAndUpdate(id, photo);
            return this.photoModel.findById(id);
        } catch (error) {
            console.log(error)
        }
    }

    async deletPhoto(id: string): Promise<photoDto> {
        try {
            return await this.photoModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error)
        }
    }

}
