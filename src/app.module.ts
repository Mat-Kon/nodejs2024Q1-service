import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artist/artist.module';
import { AlbumsModule } from './album/album.module';

@Module({
  imports: [UserModule, TracksModule, ArtistsModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
