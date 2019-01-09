import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorMessageComponent } from './api-error-message.component';

describe('ApiErrorMessageComponent', () => {
  let component: ApiErrorMessageComponent;
  let fixture: ComponentFixture<ApiErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
