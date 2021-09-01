import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot()
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
