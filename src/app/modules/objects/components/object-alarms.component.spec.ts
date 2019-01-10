import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAlarmsComponent } from './object-alarms.component';

describe('ObjectAlarmsComponent', () => {
  let component: ObjectAlarmsComponent;
  let fixture: ComponentFixture<ObjectAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
