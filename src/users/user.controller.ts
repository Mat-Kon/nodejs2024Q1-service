import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpException,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/users/user.interface';
import { isValidUUID } from 'src/utils/helperFunctions';
import { UsersService } from './user.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    const user = this.getUser(userId);
    const returnUser = this.userWithoutPassword(user);

    return returnUser;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    if (!user.login || !user.password) {
      throw new HttpException('Bad Request', 400);
    }

    const createdUser = this.usersService.createUser(user);
    const returnUser = this.userWithoutPassword(createdUser);

    return new HttpException(returnUser, 201);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateDate: UpdatePasswordDto,
  ) {
    const existingUser = this.getUser(userId);

    const isCurPassword = updateDate.oldPassword === existingUser.password;

    if (!isCurPassword) {
      throw new HttpException('Forbidden', 403);
    }

    const updatedUser = this.usersService.updateUser(userId, updateDate);
    const returnUser = this.userWithoutPassword(updatedUser);
    return returnUser;
  }

  @Delete(':userId')
  @HttpCode(204)
  deleteUser(@Param('userId') userId: string) {
    this.getUser(userId);
    this.usersService.deleteUser(userId);
  }

  private getUser(id: string) {
    isValidUUID(id);

    const user = this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }

  private userWithoutPassword(user: User) {
    const cleanUser = { ...user };
    delete cleanUser.password;
    return cleanUser;
  }
}
