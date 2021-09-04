import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { users } from '../data/users.data';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor() {
    this.users = users;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  async createUser(user: User): Promise<any> {
    const sameName = this.users.find(
      (curUser) => curUser.userName === user.userName,
    );
    if (sameName !== undefined) return 'username is used';
    const sameEmail = this.users.find(
      (curUser) => curUser.email === user.email,
    );
    if (sameEmail !== undefined) return 'email is used';

    const hashedPassword = await bcrypt.hash(user.password, 12);
    console.log(hashedPassword);
    user.id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push(user);
    return 'user registered';
  }

  loginUser(user: User): void {
    user.id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push(user);
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  updateUser(user: User): void {
    const foundIndex = this.users.findIndex(
      (userItem) => userItem.id === +user.id,
    );
    if (foundIndex > -1) {
      this.users[foundIndex] = user;
    }
  }
}
