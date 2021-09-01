import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot()
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
