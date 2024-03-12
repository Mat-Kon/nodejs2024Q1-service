import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './favorites.interface';
import { ALBUMS, ARTISTS, FAVORITES, TRACKS } from 'src/db/db';
import { findItemsInCategory } from 'src/utils/helperFunctions';

@Injectable()
export class FavoritesService {
  getAllFavorites(): FavoritesResponse {
    const favAlbum = findItemsInCategory(ALBUMS, FAVORITES.albums);
    const favArtists = findItemsInCategory(ARTISTS, FAVORITES.artists);
    const favTracks = findItemsInCategory(TRACKS, FAVORITES.tracks);

    const favorites: FavoritesResponse = {
      albums: favAlbum,
      artists: favArtists,
      tracks: favTracks,
    };
    return favorites;
  }

  addTrackToFavorites(trackId: string) {
    FAVORITES.tracks.push(trackId);
  }

  deleteTrackFromFavorites(trackId: string) {
    const index = FAVORITES.tracks.findIndex((track) => track === trackId);
    FAVORITES.tracks.splice(index, 1);
  }

  addTAlbumToFavorites(albumId: string) {
    FAVORITES.albums.push(albumId);
  }

  deleteAlbumFromFavorites(albumId: string) {
    const index = FAVORITES.albums.findIndex((album) => album === albumId);
    FAVORITES.albums.splice(index, 1);
  }

  addArtistToFavorites(artistId: string) {
    FAVORITES.artists.push(artistId);
  }

  deleteArtistFromFavorites(artistId: string) {
    const index = FAVORITES.artists.findIndex((artist) => artist === artistId);
    FAVORITES.artists.splice(index, 1);
  }
}
