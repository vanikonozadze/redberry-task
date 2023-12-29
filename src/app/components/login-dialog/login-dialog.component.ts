import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  formGroup!: FormGroup;
  showError: boolean = false;

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  toggleLoginDialog() {
    this.blogsService.toggleDialog();
  }

  onLogin() {
    if (this.formGroup.valid) {
      this.showError = false;
      this.blogsService.login(this.formGroup.value).subscribe({
        next: (data) => {
          console.log('User logged in successfully');
          this.showError = false;
          this.blogsService.toggleDialog();
          this.blogsService.toggleSuccess();
        },
        error: (err) => {
          this.showError = true;
          console.log(err.error.message);
        },
      });
    } else {
      this.showError = true;
    }
  }

  
}
