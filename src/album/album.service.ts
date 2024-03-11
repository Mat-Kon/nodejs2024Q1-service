import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { Album, AlbumDate } from './album.interface';
import { ALBUMS, FAVORITES } from 'src/db/db';

@Injectable()
export class AlbumsService {
  getAllAlbums(): Album[] {
    return ALBUMS;
  }

  getAlbumById(id: string): Album {
    return ALBUMS.find((album) => album.id === id);
  }

  createAlbum(album: AlbumDate): Album {
    const newAlbum: Album = {
      id: uuid4(),
      name: album.name,
      artistId: album.artistId ?? null,
      year: album.year,
    };

    ALBUMS.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, album: Album): Album {
    const index = ALBUMS.findIndex((album) => album.id === id);

    const existAlbum = ALBUMS[index];

    const updateAlbum: Album = {
      ...existAlbum,
      name: album.name ?? existAlbum.name,
      year: album.year ?? existAlbum.year,
      artistId: album.artistId ?? existAlbum.artistId,
    };

    ALBUMS[index] = updateAlbum;
    return updateAlbum;
  }

  deleteAlbum(id: string) {
    const indexInDB = ALBUMS.findIndex((album) => album.id === id);
    const indexInFavorites = FAVORITES.albums.findIndex((item) => item === id);
    ALBUMS.splice(indexInDB, 1);

    if (indexInFavorites !== -1) {
      FAVORITES.albums.splice(indexInFavorites, 1);
    }
  }
}
