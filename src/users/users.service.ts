import { Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user';
import { users } from '../data/users.data';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  private usersDatabase: User[] = [];
  private logger = new Logger('AuthService');
  constructor() {
    users.map(async (curUser) => {
      curUser.salt = await bcrypt.genSalt();
      curUser.passwordHash = await bcrypt.hash(curUser.password, curUser.salt);
      this.usersDatabase.push(curUser);
    });
  }

  getUsers(): User[] {
    return this.usersDatabase;
  }

  getUser(userId: number): User {
    return this.usersDatabase.find((user) => user.id === userId);
  }

  async createUser(user: User): Promise<any> {
    const sameName = this.usersDatabase.find(
      (curUser) => curUser.userName === user.userName,
    );
    if (sameName !== undefined) return 'username is used';

    const sameEmail = this.usersDatabase.find(
      (curUser) => curUser.email === user.email,
    );
    if (sameEmail !== undefined) return 'email is used';

    user.salt = await bcrypt.genSalt();
    user.passwordHash = await bcrypt.hash(user.password, user.salt);
    // const hashedPassword = await bcrypt.hash(user.password, 12);
    // console.log(hashedPassword);
    user.id = this.usersDatabase.length
      ? this.usersDatabase[this.usersDatabase.length - 1].id + 1
      : 1;
    this.usersDatabase.push(user);
    return 'user registered';
  }

  async loginUser(authInfo: AuthCredentialsDto): Promise<any> {
    console.log(authInfo.username);
    const user = this.usersDatabase.find(
      (curUser) => curUser.userName === authInfo.username,
    );
    if (user === undefined) return 'user not found';

    if (!(await bcrypt.compare(authInfo.password, user.passwordHash))) {
      console.log(user.password);
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
