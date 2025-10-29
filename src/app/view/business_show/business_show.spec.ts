import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessShow } from './business_show';

describe('BusinessShow', () => {
  let component: BusinessShow;
  let fixture: ComponentFixture<BusinessShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
