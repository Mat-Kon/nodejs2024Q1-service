import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpException,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { isValidUUID } from 'src/utils/helperFunctions';
import { TrackService } from './tracks.service';
import { Track, TrackDate } from './tracks.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly tracksService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    const existTrack = this.getTrack(id);

    return existTrack;
  }

  @Post()
  createTrack(@Body() track: TrackDate) {
    if (!track.name || !track.duration) {
      throw new HttpException(
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
      );
    }
    const newTrack = this.tracksService.createTrack(track);
    return new HttpException(newTrack, StatusCodes.CREATED);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() trackDate: Track): Track {
    this.getTrack(id);

    const updateTrack = this.tracksService.updateTrack(id, trackDate);
    return updateTrack;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTracks(@Param('id') id: string) {
    this.getTrack(id);
    this.tracksService.deleteTrack(id);
  }

  private getTrack(id: string) {
    isValidUUID(id);

    const user = this.tracksService.getTrackById(id);

    if (!user) {
      throw new HttpException(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return user;
  }
}
