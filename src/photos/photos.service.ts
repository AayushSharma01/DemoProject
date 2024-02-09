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

        const stages = [];
        if (query.albumId) {
            stages.push({
                $match: {
                    albumId: query.albumId
                }
            })
        }
        if (query.title) {
            stages.push({
                $match: {
                    title: query.title
                }
            })
        }
        if (query.thumbnailUrl) {
            stages.push({
                $match: {
                    thumbnailUrl: query.thumbnailUrl
                }
            })
        }

        if(query.url){
            stages.push({
                $match:{
                    url:query.url
                }
            })
        }
        stages.push({
            $set: {
                albumId: { "$toObjectId": "$albumId" }
            }
        })

        stages.push({
            $lookup: {
                from: 'albums',
                localField: "albumId",
                foreignField: "_id",
                as: "album"
            }
        })

        stages.push({
            $project: {
                albumId: 0
            }
        })
        const res = await this.photoModel.aggregate(stages);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`);
        return res;

    }

    async getPhoto(id: string): Promise<any[]> {


        
        const res = await this.photoModel.aggregate([
            {$match:{
                albumId:id
            }},
            {
                $set:{
                    albumId:{"$toObjectId":"$albumId"}
                }
            },
            {$lookup:{
                from:"albums",
                localField:"albumId",
                foreignField:"_id",
                as:"album"
            }},
            {
               $project:{
                albumId:0
               }
            }
        ]);
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
