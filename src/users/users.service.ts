import { Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user';
import { users } from '../data/users.data';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserInfoDTO } from './dto/user-info.dto';
@Injectable()
export class UsersService {
  private usersDatabase: User[] = [];
  private logger = new Logger('AuthService');
  constructor() {
    users.map(async (curUser) => {
      const newUser: User = {
        userName: curUser.userName,
        firstName: curUser.firstName,
        lastName: curUser.lastName,
        avatarURL: curUser.avatarURL,
        email: curUser.email,
        mobileNumber: curUser.mobileNumber,
        salt: '',
        passwordHash: '',
        id: -1,
      };
      newUser.salt = await bcrypt.genSalt();
      newUser.passwordHash = await bcrypt.hash(curUser.password, newUser.salt);
      newUser.id = this.usersDatabase.length
        ? this.usersDatabase[this.usersDatabase.length - 1].id + 1
        : 1;
      this.usersDatabase.push(newUser);
    });
  }

  getUsers(): User[] {
    return this.usersDatabase;
  }

  getUser(userId: number): User {
    return this.usersDatabase.find((user) => user.id === userId);
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
    const newUser: User = {
      userName: userInfo.userName,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      avatarURL: userInfo.avatarURL,
      email: userInfo.email,
      mobileNumber: userInfo.mobileNumber,
      salt: '',
      passwordHash: '',
      id: -1,
    };

    newUser.salt = await bcrypt.genSalt();
    newUser.passwordHash = await bcrypt.hash(userInfo.password, newUser.salt);
    // const hashedPassword = await bcrypt.hash(user.password, 12);
    // console.log(hashedPassword);
    newUser.id = this.usersDatabase.length
      ? this.usersDatabase[this.usersDatabase.length - 1].id + 1
      : 1;
    this.usersDatabase.push(newUser);
    return 'user registered';
  }

  async loginUser(authInfo: AuthCredentialsDTO): Promise<any> {
    console.log(authInfo.username);
    const user = this.usersDatabase.find(
      (curUser) => curUser.userName === authInfo.username,
    );
    if (user === undefined) return 'user not found';

    if (!(await bcrypt.compare(authInfo.password, user.passwordHash))) {
      console.log(user.passwordHash);
      return 'wrong password';
    }

    return user;
    // const payload: JwtPayload = { username: user.userName };
    // const accessToken = await this.jwtService.sign(payload);
    // this.logger.debug(
    //   `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    // );
    // user.id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    // this.users.push(user);
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
