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
import { Artist } from './artist.interface';
import { ArtistsService } from './artist.service';
import { isValidUUID } from 'src/utils/helperFunctions';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Controller('api/artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    const artist = this.getArtist(id);
    return artist;
  }

  @Post()
  createArtist(@Body() artist: Artist) {
    if (!artist.name || !artist.grammy) {
      throw new HttpException(
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
      );
    }

    const newArtist = this.artistsService.createArtist(artist);
    return newArtist;
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() artist: Artist) {
    this.getArtist(id);

    const updateArtist = this.artistsService.updateArtist(id, artist);
    return updateArtist;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    this.getArtist(id);
    this.artistsService.deleteArtist(id);
  }

  private getArtist(id: string) {
    isValidUUID(id);

    const user = this.artistsService.getArtistById(id);

    if (!user) {
      throw new HttpException(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return user;
  }
}
