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
  getBlogs(): { result: Blog[] } {
    return { result: this.blogsService.getBlogs() };
  }

  @Get('/:blogId')
  getBlog(@Param('blogId', ParseIntPipe) blogId: number): { result: Blog } {
    return { result: this.blogsService.getBlog(blogId) };
  }

  @Post()
  createBlog(@Body() blog: Blog): void {
    this.blogsService.createBlog(blog);
  }

  @Delete('/:blogId')
  deleteBlog(@Param('blogId', ParseIntPipe) blogId: number): void {
    this.blogsService.deleteBlog(blogId);
  }

  @Put()
  updateBlog(@Body() blog: Blog): void {
    this.blogsService.updateBlog(blog);
  }
}
