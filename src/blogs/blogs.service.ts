import { Injectable } from '@nestjs/common';
import { Blog } from '../models/blog';
import { blogs } from '../data/blogs.data';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];
  constructor() {
    this.blogs = blogs;
  }

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlog(blogId: number): Blog {
    return this.blogs.find((blog) => blog.id === blogId);
  }

  createBlog(blog: Blog): void {
    blog.id = this.blogs.length ? this.blogs[this.blogs.length - 1].id + 1 : 1;
    this.blogs.push(blog);
  }

  deleteBlog(blogId: number): void {
    this.blogs = this.blogs.filter((blog) => blog.id !== blogId);
  }

  updateBlog(blog: Blog): void {
    const foundIndex = this.blogs.findIndex(
      (blogItem) => blogItem.id === +blog.id,
    );
    if (foundIndex > -1) {
      this.blogs[foundIndex] = blog;
    }
  }
}
