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
  async createUser(@Body() user: User): Promise<any> {
    return this.usersService.createUser(user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.usersService.deleteUser(id);
  }

  @Post('/login')
  async loginUser(@Body() user: User): Promise<void> {
    this.usersService.loginUser(user);
  }

  @Put()
  async updateUser(@Body() user: User): Promise<void> {
    this.usersService.updateUser(user);
  }
}
