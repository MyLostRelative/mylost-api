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
  async getBlogs(): Promise<{ result: Blog[] }> {
    return { result: this.blogsService.getBlogs() };
  }

  @Get('/:blogId')
  async getBlog(@Param('blogId', ParseIntPipe) blogId: number): Promise<{
    result: Blog;
  }> {
    return { result: this.blogsService.getBlog(blogId) };
  }

  @Post()
  async createBlog(@Body() blog: Blog): Promise<void> {
    this.blogsService.createBlog(blog);
  }

  @Delete('/:blogId')
  async deleteBlog(
    @Param('blogId', ParseIntPipe) blogId: number,
  ): Promise<void> {
    this.blogsService.deleteBlog(blogId);
  }

  @Put()
  async updateBlog(@Body() blog: Blog): Promise<void> {
    this.blogsService.updateBlog(blog);
  }
}
