import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { FavoritesResponse } from './favorites.interface';
import { FavoritesService } from './favorites.service';
import { ALBUMS, ARTISTS, FAVORITES, TRACKS } from 'src/db/db';
import { isValidUUID } from 'src/utils/helperFunctions';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Controller('api/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @Post('api/track/:id')
  addTrackToFavorites(@Param('id') trackId: string) {
    isValidUUID(trackId);
    this.checkExistInCategory(TRACKS, trackId);

    this.favoritesService.addTrackToFavorites(trackId);
    return new HttpException(ReasonPhrases.CREATED, StatusCodes.CREATED);
  }

  @Delete('api/track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') trackId: string) {
    isValidUUID(trackId);
    this.checkExistInFavorites(FAVORITES.tracks, trackId);

    this.favoritesService.deleteTrackFromFavorites(trackId);
  }

  @Post('api/album/:id')
  addAlbumToFavorites(@Param('id') albumId: string) {
    isValidUUID(albumId);
    this.checkExistInCategory(ALBUMS, albumId);
    this.favoritesService.addTAlbumToFavorites(albumId);
    return new HttpException(ReasonPhrases.CREATED, StatusCodes.CREATED);
  }

  @Delete('api/album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') albumId: string) {
    isValidUUID(albumId);
    this.checkExistInFavorites(FAVORITES.albums, albumId);
    return this.favoritesService.deleteAlbumFromFavorites(albumId);
  }

  @Post('api/artist/:id')
  addArtistToFavorites(@Param('id') artistId: string) {
    isValidUUID(artistId);
    this.checkExistInCategory(ARTISTS, artistId);
    this.favoritesService.addArtistToFavorites(artistId);
    return new HttpException(ReasonPhrases.CREATED, StatusCodes.CREATED);
  }

  @Delete('api/artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') artistId: string) {
    isValidUUID(artistId);
    this.checkExistInFavorites(FAVORITES.artists, artistId);
    this.favoritesService.deleteArtistFromFavorites(artistId);
    return new HttpException(ReasonPhrases.CREATED, StatusCodes.CREATED);
  }

  private checkExistInCategory<T extends { id: string }>(
    category: T[],
    id: string,
  ) {
    const isExist = category.find((item) => item.id === id);
    if (!isExist) {
      throw new HttpException(
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private checkExistInFavorites(category: string[], id: string) {
    const isExist = category.find((item) => item === id);
    if (!isExist) {
      throw new HttpException(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
  }
}
