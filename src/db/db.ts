import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
import { Favorites } from 'src/favorites/favorites.interface';
import { Track } from 'src/tracks/tracks.interface';
import { User } from 'src/users/user.interface';

const USERS: User[] = [];
const TRACKS: Track[] = [];
const ARTISTS: Artist[] = [];
const ALBUMS: Album[] = [];
const FAVORITES: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

export { USERS, TRACKS, ARTISTS, ALBUMS, FAVORITES };
