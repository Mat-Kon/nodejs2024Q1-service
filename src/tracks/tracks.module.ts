import { Module } from '@nestjs/common';
import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TracksModule {}
