import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodePerformanceComponent } from './node-performance.component';

describe('NodePerformanceComponent', () => {
  let component: NodePerformanceComponent;
  let fixture: ComponentFixture<NodePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
