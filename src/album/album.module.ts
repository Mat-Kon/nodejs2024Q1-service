import { Module } from '@nestjs/common';
import { AlbumsController } from './album.controller';
import { AlbumsService } from './album.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
