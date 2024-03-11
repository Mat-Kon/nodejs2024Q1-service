import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { Artist, ArtistDate } from './artist.interface';
import { ARTISTS } from 'src/db/db';

@Injectable()
export class ArtistsService {
  getAllArtists(): Artist[] {
    return ARTISTS;
  }

  getArtistById(id: string): Artist | undefined {
    return ARTISTS.find((artist) => artist.id === id);
  }

  createArtist(artist: ArtistDate): Artist {
    const newArtist: Artist = {
      id: uuid4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    ARTISTS.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, artist: Artist): Artist {
    const index = ARTISTS.findIndex((artist) => artist.id === id);

    const existArtist = ARTISTS[index];

    const updateArtist: Artist = {
      ...existArtist,
      name: artist.name ?? existArtist.name,
      grammy: artist.grammy ?? existArtist.grammy,
    };

    ARTISTS[index] = updateArtist;

    return updateArtist;
  }

  deleteArtist(id: string) {
    const index = ARTISTS.findIndex((artist) => artist.id === id);
    ARTISTS.splice(index, 1);
  }
}
