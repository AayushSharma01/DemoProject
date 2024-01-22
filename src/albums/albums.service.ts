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
    async getAlbums(query: AlbumQuery): Promise<AlbumDto[]> {

        const res = await this.albumModel.find(query);
        if (!res)
            throw new NotFoundException(`Data for give ${query} does not exit.`)
        return res;

    }
    async getAlbum(id: string): Promise<AlbumDto> {

        const res = await this.albumModel.findById(id);
        if (!res)
            throw new NotFoundException(`Data for give ${id} does not exit.`)
        return res


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
