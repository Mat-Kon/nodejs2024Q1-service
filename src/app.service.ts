import { Injectable } from '@nestjs/common';
import { AppRoutes } from './types/appRoutes.interface';
import { config } from 'dotenv';

config();

@Injectable()
export class AppService {
  getRoutes(): AppRoutes {
    const appRoutes: AppRoutes = {
      album: `http://localhost:${process.env.PORT}/album`,
      artist: `http://localhost:${process.env.PORT}/artist`,
      favorites: `http://localhost:${process.env.PORT}/favs`,
      track: `http://localhost:${process.env.PORT}/track`,
      users: `http://localhost:${process.env.PORT}/user`,
    };

    return appRoutes;
  }
}
