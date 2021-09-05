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
import { User } from 'src/models/user';
import { UserInfoDTO } from '../dto/user-info.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<{ result: User[] }> {
    return { result: this.usersService.getUsers() };
  }

  @Get('/:userId')
  async getUserBy(
    @Param('userId', ParseIntPipe) idId: number,
  ): Promise<{ result: User }> {
    return { result: this.usersService.getUser(idId) };
  }

  @Post('/register')
  async createUser(@Body() userInfo: UserInfoDTO): Promise<any> {
    return this.usersService.createUser(userInfo);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.usersService.deleteUser(id);
  }

  @Put()
  async updateUser(@Body() user: User): Promise<void> {
    this.usersService.updateUser(user);
  }
}
