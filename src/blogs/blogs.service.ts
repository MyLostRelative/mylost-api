import { Injectable } from '@nestjs/common';
import { Blog } from '../models/blog';
import { blogs } from '../data/blogs.data';

@Injectable()
export class BlogsService {
  private blogsDatabase: Blog[] = [];
  constructor() {
    blogs.map((blog) => {
      const curDate: Date = new Date();
      const newId = this.blogsDatabase.length
        ? this.blogsDatabase[this.blogsDatabase.length - 1].id + 1
        : 1;
      const newBlog: Blog = {
        id: newId,
        title: blog.title,
        description: blog.description,
        imageUrl: blog.imageUrl,
        createDate: curDate,
      };
      this.blogsDatabase.push(newBlog);
    });
  }

  getBlogs(): Blog[] {
    return this.blogsDatabase;
  }

  getBlog(blogId: number): Blog {
    return this.blogsDatabase.find((blog) => blog.id === blogId);
  }

  createBlog(blog: Blog): void {
    blog.id = this.blogsDatabase.length
      ? this.blogsDatabase[this.blogsDatabase.length - 1].id + 1
      : 1;
    this.blogsDatabase.push(blog);
  }

  deleteBlog(blogId: number): void {
    this.blogsDatabase = this.blogsDatabase.filter(
      (blog) => blog.id !== blogId,
    );
  }

  updateBlog(blog: Blog): void {
    const foundIndex = this.blogsDatabase.findIndex(
      (blogItem) => blogItem.id === +blog.id,
    );
    if (foundIndex > -1) {
      this.blogsDatabase[foundIndex] = blog;
    }
  }
}
