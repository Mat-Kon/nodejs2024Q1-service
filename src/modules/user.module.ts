import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/user.controller';
import { UsersService } from 'src/services/user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
