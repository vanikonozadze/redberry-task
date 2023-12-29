import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public blogsService: BlogsService) {}

  ngOnInit(): void {}

  toggleLoginDialog() {
    this.blogsService.toggleDialog();
  }

  toggleLogIn() {
    this.blogsService.toggleLogIn();
  }
}
