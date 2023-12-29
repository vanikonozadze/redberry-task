import { BlogsService } from './../../services/blogs.service';
import { Category } from './../../models/categorie.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  addBlogForm!: FormGroup;
  categories: Category[] = [];
  addBlogData: any = {
    id: '',
    author: '',
    title: '',
    description: '',
    image: '',
    publish_date: '',
    email: '',
    data: undefined,
  };

  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.handleFile(file);
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.addBlogData.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addBlog() {
    const formData = new FormData();
    formData.append('author', this.addBlogData.author);
    formData.append('title', this.addBlogData.title);
    formData.append('description', this.addBlogData.description);
    formData.append('publish_date', this.addBlogData.publish_date);
    formData.append('email', this.addBlogData.email);
    formData.append('image', this.dataURItoBlob(this.addBlogData.image));
    const categoryIds = [1, 2, 3];
    categoryIds.forEach((categoryId) => {
      formData.append('categories[]', String(categoryId));
    });

    this.blogsService.addBlog(formData).subscribe({
      next: (data) => {
        alert('გამოქვეყნდა');
        this.router.navigate(['blogs']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
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
}
