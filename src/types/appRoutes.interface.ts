export interface AppRoutes {
  album: string;
  artist: string;
  favorites: string;
  track: string;
  users: string;
}

export interface FindItems<T> {
  listId: string[];
  items: T[];
}
