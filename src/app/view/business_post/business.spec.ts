import { ComponentFixture, TestBed } from '@angular/core/testing';

import {Business_Post } from './business_post';

describe('Business', () => {
  let component: Business_Post;
  let fixture: ComponentFixture<Business_Post>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Business_Post]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Business_Post);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
