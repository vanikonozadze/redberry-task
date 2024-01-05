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
    '546e33f418fcb1ef019f10df351d66680105b54271a5d51153467f3103ccc39c';
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
