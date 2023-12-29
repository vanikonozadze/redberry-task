import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-login-successful',
  templateUrl: './login-successful.component.html',
  styleUrls: ['./login-successful.component.css'],
})
export class LoginSuccessfulComponent implements OnInit {
  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {}

  toggleSuccessDialog() {
    this.blogsService.toggleSuccess();
    this.blogsService.toggleLogIn();
  }
}
