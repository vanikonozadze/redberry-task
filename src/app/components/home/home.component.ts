import { BlogsService } from './../../services/blogs.service';
import { Category } from './../../models/categorie.model';
import { Blog } from './../../models/blog.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  blogs: Blog[] = [];
  categoryFilter: Blog[] = [];
  toggledCategories: string[] = [];

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getBlogs();
  }

  getCategories() {
    this.blogsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data.map((category: Category) => ({
          id: category.id,
          title: category.title,
          text_color: category.text_color,
          background_color: category.background_color,
        }));
      },
    });
  }

  getBlogs() {
    this.blogsService.getBlogs().subscribe({
      next: (data: Blog) => {
        this.blogs = data.data.map((blog: Blog) => ({
          id: blog.id,
          title: blog.title,
          description: blog.description,
          image: blog.image,
          publish_date: blog.publish_date,
          author: blog.author,
          categories: blog.categories.map((category: Category) => ({
            id: category.id,
            title: category.title,
            text_color: category.text_color,
            background_color: category.background_color,
          })),
        }));
        this.categoryFilter = this.blogs;
      },
    });
  }

  clicked(category: Category): boolean {
    return this.toggledCategories.includes(category.title);
  }

  getStyle(category: Category): any {
    return {
      'background-color': category.background_color,
      color: category.text_color,
      border: this.clicked(category)
        ? '2px solid black'
        : '2px solid transparent',
    };
  }

  categoriesClicked(category: Category) {
    const index = this.toggledCategories.indexOf(category.title);
    console.log(index);

    if (index !== -1) {
      this.toggledCategories.splice(index, 1);
    } else {
      this.toggledCategories.push(category.title);
    }

    if (this.toggledCategories.length === 0) {
      this.categoryFilter = this.blogs;
    } else {
      this.categoryFilter = this.blogs.filter((blog) =>
        blog.categories.some((category: Category) =>
          this.toggledCategories.includes(category.title)
        )
      );
    }

    localStorage.setItem(
      'toggledCategories',
      JSON.stringify(this.toggledCategories)
    );
  }
}
