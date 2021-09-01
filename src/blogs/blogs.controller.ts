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
import { Blog } from 'src/models/blog';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getBlogs(): Blog[] {
    return this.blogsService.getBlogs();
  }

  @Get('/:blogId')
  getBlog(@Param('blogId', ParseIntPipe) blogId: number): Blog {
    return this.blogsService.getBlog(blogId);
  }

  @Post()
  createBlog(@Body() blog: Blog): void {
    this.blogsService.createBlog(blog);
  }

  @Delete('/:id')
  deleteBlog(@Param('id', ParseIntPipe) id: number): void {
    this.blogsService.deleteBlog(id);
  }

  @Put()
  updateBlog(@Body() blog: Blog): void {
    this.blogsService.updateBlog(blog);
  }
}
