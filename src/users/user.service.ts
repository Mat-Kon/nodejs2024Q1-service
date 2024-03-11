import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import {
  User,
  UserResponse,
  CreateUserDto,
  UpdatePasswordDto,
} from './user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): UserResponse[] {
    const returnUsers: User[] = [];

    this.users.forEach((user) => {
      const userCopy = { ...user };
      delete userCopy.password;
      returnUsers.push(userCopy);
    });
    return returnUsers;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
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

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateDate: UpdatePasswordDto): User {
    const index = this.users.findIndex((user) => user.id === id);

    const user = this.users[index];

    const updateUser: User = {
      ...user,
      password: updateDate.newPassword,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };

    this.users[index] = updateUser;

    return updateUser;
  }

  deleteUser(id: string) {
    this.users.filter((user) => user.id !== id);
  }
}
