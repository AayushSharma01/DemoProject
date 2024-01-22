import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumDto } from 'src/dto/album-dto';
import { AlbumQuery } from 'src/Query';

@Controller()
export class AlbumsController {
    constructor(private albumService:AlbumsService){}
    @Get('albums')
    async getAlbums(
        @Query() query:AlbumQuery
    ):Promise<AlbumDto[]>{
        return this.albumService.getAlbums(query);
    }

    @Get('albums/:id')
    async getAlbum(
        @Param('id')id:string
    ){
        return this.albumService.getAlbum(id);

    }

    @Get('users/:userId/albums')
    async getUserAlbum(
        @Param('userId') userId:string,
        @Query() query:AlbumQuery
    ):Promise<AlbumDto[]>{
        return this.albumService.getAlbums(query)

    }

    @Post('albums')
    async postAlbum(
        @Body()
        album:AlbumDto
    ):Promise<AlbumDto>{
        return this.albumService.postAlbum(album);
    }

    
    
    @Put('albums/:id')
    async updateAlbum(
        @Body()
        album:AlbumDto,
        @Param('id')id:string
    ){
        return this.albumService.updateAlbum(album , id);

    }
    @Delete('albums/:id')
    async deletAlbum(
        @Param('id')id:string
    ){
        return this.albumService.deletAlbum(id);

    }
}
