import { Injectable } from '@nestjs/common';
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
        try {
            return await this.albumModel.find(query);
        } catch (error) {
            console.log(error);
        }
    }

    async postAlbum(album: AlbumDto): Promise<AlbumDto> {

        try {
            const res = await this.albumModel.create(album);
            const result = res.save();
            return result;

        } catch (error) {
            console.log(error)

        }

    }

    async getAlbum(id: string): Promise<AlbumDto> {

        try {

            return await this.albumModel.findById(id);

        } catch (error) {
            console.log(error)

        }
    }

    async updateAlbum(album: AlbumDto, id: string): Promise<AlbumDto> {

        try {
            await this.albumModel.findByIdAndUpdate(id, album);
            return this.albumModel.findById(id);

        } catch (error) {
            console.log(error)

        }
    }

    async deletAlbum(id: string): Promise<AlbumDto> {

        try {
            return await this.albumModel.findByIdAndDelete(id);

        } catch (error) {
            console.log(error)

        }
    }
}
