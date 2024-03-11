import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { Album, AlbumDate } from './album.interface';
import { AlbumsService } from './album.service';
import { isValidUUID } from 'src/utils/helperFunctions';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string): Album {
    const album = this.getAlbum(id);
    return album;
  }

  @Post()
  createAlbum(@Body() album: AlbumDate): Album {
    if (!album.name || !album.year || typeof album.year !== 'number') {
      throw new HttpException(
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
      );
    }

    const newAlbum = this.albumsService.createAlbum(album);
    return newAlbum;
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() album: Album): Album {
    this.getAlbum(id);

    if (typeof album.year !== 'number') {
      throw new HttpException(
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
      );
    }

    const updateAlbum = this.albumsService.updateAlbum(id, album);
    return updateAlbum;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    this.getAlbum(id);
    this.albumsService.deleteAlbum(id);
  }

  private getAlbum(id: string) {
    isValidUUID(id);

    const user = this.albumsService.getAlbumById(id);

    if (!user) {
      throw new HttpException(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return user;
  }
}
