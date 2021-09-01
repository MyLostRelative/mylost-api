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
  getUsers(): { result: User[] } {
    return { result: this.usersService.getUsers() };
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) idId: number): { result: User } {
    return { result: this.usersService.getUser(idId) };
  }

  @Post()
  createUser(@Body() user: User): void {
    this.usersService.createUser(user);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.deleteUser(id);
  }

  @Put()
  updateUser(@Body() user: User): void {
    this.usersService.updateUser(user);
  }
}
