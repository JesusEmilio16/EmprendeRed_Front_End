import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Business_comments } from './business_comments';

describe('Business_commentsComponent', () => {
  let component: Business_comments;
  let fixture: ComponentFixture<Business_comments>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Business_comments ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Business_comments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

