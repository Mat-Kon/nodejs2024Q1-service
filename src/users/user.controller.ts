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
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { isValidUUID } from 'src/utils/helperFunctions';
import { UsersService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.getUser(id);
    const returnUser = this.userWithoutPassword(user);

    return returnUser;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    if (!user.login || !user.password) {
      throw new HttpException(
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
      );
    }

    const createdUser = this.usersService.createUser(user);
    const returnUser = this.userWithoutPassword(createdUser);

    return new HttpException(returnUser, StatusCodes.CREATED);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateDate: UpdatePasswordDto) {
    const existingUser = this.getUser(id);

    const isCurPassword = updateDate.oldPassword === existingUser.password;

    if (!isCurPassword) {
      throw new HttpException(ReasonPhrases.FORBIDDEN, StatusCodes.FORBIDDEN);
    }

    const updatedUser = this.usersService.updateUser(id, updateDate);
    const returnUser = this.userWithoutPassword(updatedUser);
    return returnUser;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    this.getUser(id);
    this.usersService.deleteUser(id);
  }

  private getUser(id: string) {
    isValidUUID(id);

    const user = this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return user;
  }

  private userWithoutPassword(user: User) {
    const cleanUser = { ...user };
    delete cleanUser.password;
    return cleanUser;
  }
}
