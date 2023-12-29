import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { Category } from 'src/app/models/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  baseApiUrl: string = 'https://api.blog.redberryinternship.ge/api/';
  private token =
    '908f302445d4975be1473a04c42bd4a005b0c0376489a8352ef20283bf6a82fb';
  showDialog = false;
  showSuccess = false;
  showLoggedInUser = false;
  atAddBlogPage = false;

  constructor(private http: HttpClient) {}

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

  toggleSuccess() {
    this.showSuccess = !this.showSuccess;
  }

  toggleLogIn() {
    this.showLoggedInUser = !this.showLoggedInUser;
  }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.baseApiUrl + 'categories');
  }

  login(email: string): Observable<any> {
    return this.http.post<Blog>(this.baseApiUrl + 'login', email);
  }

  getBlogs(): Observable<Blog> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get<Blog>(this.baseApiUrl + 'blogs', { headers });
  }

  postBlogs(blogData: Blog): Observable<Blog> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.post<Blog>(this.baseApiUrl + 'blogs', blogData, {
      headers,
    });
  }

  getBlog(id: string): Observable<Blog> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get<Blog>(this.baseApiUrl + 'blogs/' + id, { headers });
  }

  addBlog(blogData: any): Observable<any> {
    blogData.id = '123';
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.post<Blog>(this.baseApiUrl + 'blogs', blogData, {
      headers,
    });
  }
}
