import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { photoDto } from 'src/dto/photo-dto';
import { query } from 'express';
import { PhotoQuery } from 'src/Query';
import { PhotoIntercepter } from './photos.interceptor';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(PhotoIntercepter)
@Controller()
export class PhotosController {
    constructor(private photosService:PhotosService){}
      
    @Get('photos')
    async getPhotos(
        @Query() query:PhotoQuery
    ):Promise<photoDto[]>{
        return this.photosService.getPhotos(query);
    }

    @Get('photos/:id')
    async getPhoto(
        @Param('id')id:string
    ){
        return this.photosService.getPhoto(id);

    }

    @Get('albums/:albumId/photos')
    async getAlbumPosts(
        @Param('albumId') albumId:string,
        @Query() query:PhotoQuery
    ){
        query.albumId = albumId
        return this.photosService.getPhotos(query)

    }


    @UseGuards(AuthGuard())
    @Post('photos')
    async createPhtoto(
        @Body()
        photo:photoDto
    ):Promise<photoDto>{
        return this.photosService.postPhoto(photo);
    }

    @UseGuards(AuthGuard())
    @Put('photos/:id')
    async updatePhoto(
        @Body()
        photo:photoDto,
        @Param('id')id:string
    ){
        return this.photosService.updatePhoto(photo , id);

    }
    @UseGuards(AuthGuard())
    @Delete('photos/:id')
    async deletPhoto(
        @Param('id')id:string
    ){
        return this.photosService.deletPhoto(id);

    }
}
