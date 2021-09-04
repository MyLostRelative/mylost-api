import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User, UserInfo } from 'src/models/user';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<{ result: User[] }> {
    return { result: this.usersService.getUsers() };
  }

  @Get('/:userId')
  async getUser(
    @Param('userId', ParseIntPipe) idId: number,
  ): Promise<{ result: User }> {
    return { result: this.usersService.getUser(idId) };
  }

  @Post('/register')
  async createUser(@Body() userInfo: UserInfo): Promise<any> {
    console.log(userInfo);
    return this.usersService.createUser(userInfo);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.usersService.deleteUser(id);
  }

  @Post('/login')
  async loginUser(@Body() authInfo: AuthCredentialsDto): Promise<void> {
    return this.usersService.loginUser(authInfo);
  }

  @Put()
  async updateUser(@Body() user: User): Promise<void> {
    this.usersService.updateUser(user);
  }
}
