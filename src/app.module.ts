import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artist/artist.module';

@Module({
  imports: [UserModule, TracksModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
