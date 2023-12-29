import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { Category } from '../../models/categorie.model';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blog: Blog = {
    id: '',
    author: '',
    title: '',
    description: '',
    image: '',
    publish_date: '',
    categories: [],
    email: '',
    data: undefined,
  };
  blogs: Blog[] = [];
  blogsCategories: Category[] = [];
  categoryFilter: Blog[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBlogs();

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.blogsService.getBlog(id).subscribe({
            next: (response) => {
              this.blog = response;
              this.blogsCategories = this.blog.categories;
            },
          });
        }
      },
    });
  }

  getBlogs() {
    this.blogsService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filteredBlogs() {
    if (this.blogs.length > 0 && this.blogsCategories.length > 0) {
      this.categoryFilter = this.blogs.filter((blog) => {
        return this.blogsCategories.some(
          (category) => category.title === blog.title
        );
      });
    }
  }

  getRelatedBlogs(): Blog[] {
    if (this.blog && this.blogs.length > 0) {
      const relatedBlogs: Blog[] = [];

      this.blogs.forEach((blog) => {
        if (
          blog.id !== this.blog.id &&
          blog.categories.some((category: Category) =>
            this.blog.categories.some(
              (blogCategory: Category) => blogCategory.title === category.title
            )
          )
        ) {
          relatedBlogs.push(blog);
        }
      });

      return relatedBlogs;
    }
    return [];
  }
}
