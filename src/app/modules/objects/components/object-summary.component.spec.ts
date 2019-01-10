import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSummaryComponent } from './object-summary.component';

describe('ObjectSummaryComponent', () => {
  let component: ObjectSummaryComponent;
  let fixture: ComponentFixture<ObjectSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
