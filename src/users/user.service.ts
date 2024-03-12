import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import {
  User,
  UserResponse,
  CreateUserDto,
  UpdatePasswordDto,
} from './user.interface';
import { USERS } from 'src/db/db';

@Injectable()
export class UsersService {
  private user: User[] = [];
  getAllUsers(): UserResponse[] {
    const returnUsers: User[] = [];

    this.user.forEach((user) => {
      const userCopy = { ...user };
      delete userCopy.password;
      returnUsers.push(userCopy);
    });
    return returnUsers;
  }

  getUserById(id: string): User | undefined {
    return this.user.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto): User {
    const newUser: User = {
      id: uuid4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.user.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateDate: UpdatePasswordDto): User {
    const index = this.user.findIndex((user) => user.id === id);

    const user = this.user[index];

    const updateUser: User = {
      ...user,
      password: updateDate.newPassword,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };

    this.user[index] = updateUser;

    return updateUser;
  }

  deleteUser(id: string) {
    const index = this.user.findIndex((user) => user.id === id);
    this.user.splice(index, 1);
  }
}
