import { Injectable, Logger } from '@nestjs/common';
import { Role, User } from '../models/user';
import { users } from '../data/users.data';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserInfoDTO } from '../dto/user-info.dto';

@Injectable()
export class UsersService {
  private usersDatabase: User[] = [];
  private logger = new Logger('AuthService');
  constructor(private jwtService: JwtService) {
    users.map(async (curUser) => {
      const curSalt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(curUser.password, curSalt);
      const newID = this.usersDatabase.length
        ? this.usersDatabase[this.usersDatabase.length - 1].id + 1
        : 1;

      const newUser: User = {
        id: newID,
        userName: curUser.userName,
        firstName: curUser.firstName,
        lastName: curUser.lastName,
        avatarURL: curUser.avatarURL,
        email: curUser.email,
        mobileNumber: curUser.mobileNumber,
        passwordHash: hash,
        role: curUser.role,
      };

      newUser.id = this.usersDatabase.push(newUser);
    });
  }

  getUsers(): User[] {
    return this.usersDatabase;
  }

  getUser(userId: number): User {
    return this.usersDatabase.find((user) => user.id === userId);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersDatabase.find((curUser) => curUser.userName === username);
  }

  async createUser(userInfo: UserInfoDTO): Promise<any> {
    const sameName = this.usersDatabase.find(
      (curUser) => curUser.userName === userInfo.userName,
    );
    if (sameName !== undefined) return 'username is used';

    const sameEmail = this.usersDatabase.find(
      (curUser) => curUser.email === userInfo.email,
    );
    if (sameEmail !== undefined) return 'email is used';

    const curSalt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userInfo.password, curSalt);
    const newID = this.usersDatabase.length
      ? this.usersDatabase[this.usersDatabase.length - 1].id + 1
      : 1;

    const newUser: User = {
      userName: userInfo.userName,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      avatarURL: userInfo.avatarURL,
      email: userInfo.email,
      mobileNumber: userInfo.mobileNumber,
      passwordHash: hash,
      id: newID,
      role: Role.MEMBER,
    };

    newUser.id = this.usersDatabase.length
      ? this.usersDatabase[this.usersDatabase.length - 1].id + 1
      : 1;
    this.usersDatabase.push(newUser);

    const payload: JwtPayload = { username: newUser.userName, id: newUser.id };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return {
      access_token: accessToken,
    };
  }

  deleteUser(userId: number): void {
    this.usersDatabase = this.usersDatabase.filter(
      (user) => user.id !== userId,
    );
  }

  updateUser(user: User): void {
    const foundIndex = this.usersDatabase.findIndex(
      (userItem) => userItem.id === +user.id,
    );
    if (foundIndex > -1) {
      this.usersDatabase[foundIndex] = user;
    }
  }
}
