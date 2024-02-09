import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumQuery } from 'src/Query';
import { AlbumDto } from 'src/dto/album-dto';
import { Album } from './albums.model';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectModel(Album.name)
        private albumModel: Model<Album>
    ) { }
    async getAlbums(query: AlbumQuery): Promise<any[]> {
        
        const stages = [];

        if(query.userId){
            stages.push({
                $match:{
                    userId:query.userId
                }
            })

        }

        if(query.title){
            stages.push({
                $match:{
                    title:query.title
                }
            })
        }

        stages.push({$set:{
            userId:{"$toObjectId": "$userId", }

        }});

        stages.push({
            $lookup:{
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        })

        stages.push({
           $project:{
            userId:0
           }
        })
        

        const res = await this.albumModel.aggregate(stages);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`)
        return res;

    }
    async getAlbum(id: string): Promise<any[]> {

        const res = await this.albumModel.aggregate([
            {$match:{
                userId:id
            }},
            {
                $set:{
                    userId:{"$toObjectId":"$userId"}
                }
            },
            {$lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"creator"
            }},
            {
               $project:{
                userId:0
               }
            }
        ]);

        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`)

        return res;


    }

    async postAlbum(album: AlbumDto): Promise<AlbumDto> {

        const res = await this.albumModel.create(album);
        const result = res.save();
        return result;



    }



    async updateAlbum(album: AlbumDto, id: string): Promise<AlbumDto> {


        await this.albumModel.findByIdAndUpdate(id, album);
        return this.albumModel.findById(id);

    }

    async deletAlbum(id: string): Promise<AlbumDto> {

        return await this.albumModel.findByIdAndDelete(id);


    }
}
