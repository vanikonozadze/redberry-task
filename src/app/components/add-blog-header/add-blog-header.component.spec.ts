import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogHeaderComponent } from './add-blog-header.component';

describe('AddBlogHeaderComponent', () => {
  let component: AddBlogHeaderComponent;
  let fixture: ComponentFixture<AddBlogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlogHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
