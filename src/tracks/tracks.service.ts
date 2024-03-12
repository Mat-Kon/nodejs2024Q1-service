import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { Track, TrackDate } from './tracks.interface';
import { FAVORITES, TRACKS } from 'src/db/db';

@Injectable()
export class TrackService {
  getAllTracks(): Track[] {
    return TRACKS;
  }

  getTrackById(id: string): Track | undefined {
    return TRACKS.find((track) => track.id === id);
  }

  createTrack(trackDate: TrackDate): Track {
    const newTrack: Track = {
      id: uuid4(),
      name: trackDate.name,
      albumId: trackDate.albumId,
      artistId: trackDate.artistId,
      duration: trackDate.duration,
    };

    TRACKS.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, trackDate: Track): Track {
    const index = TRACKS.findIndex((track) => track.id === id);

    const track = TRACKS[index];

    const updateTrack: Track = {
      ...track,
      albumId: trackDate.albumId ?? track.albumId,
      artistId: trackDate.artistId ?? track.artistId,
      duration: trackDate.duration ?? track.duration,
      name: trackDate.name ?? track.name,
    };

    TRACKS[index] = updateTrack;

    return updateTrack;
  }

  deleteTrack(id: string) {
    const index = TRACKS.findIndex((track) => track.id === id);
    const indexInFavorites = FAVORITES.tracks.findIndex((item) => item === id);
    TRACKS.splice(index, 1);

    if (indexInFavorites !== -1) {
      FAVORITES.tracks.splice(indexInFavorites, 1);
    }
  }
}
