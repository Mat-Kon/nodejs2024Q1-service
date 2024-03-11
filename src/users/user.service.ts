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
  getAllUsers(): UserResponse[] {
    const returnUsers: User[] = [];

    USERS.forEach((user) => {
      const userCopy = { ...user };
      delete userCopy.password;
      returnUsers.push(userCopy);
    });
    return returnUsers;
  }

  getUserById(id: string): User | undefined {
    return USERS.find((user) => user.id === id);
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

    USERS.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateDate: UpdatePasswordDto): User {
    const index = USERS.findIndex((user) => user.id === id);

    const user = USERS[index];

    const updateUser: User = {
      ...user,
      password: updateDate.newPassword,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };

    USERS[index] = updateUser;

    return updateUser;
  }

  deleteUser(id: string) {
    const index = USERS.findIndex((user) => user.id === id);
    if (index !== -1) {
      USERS.splice(index, 1);
    }
  }
}
