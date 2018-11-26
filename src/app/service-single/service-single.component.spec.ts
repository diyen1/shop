import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSingleComponent } from './service-single.component';

describe('ServiceSingleComponent', () => {
  let component: ServiceSingleComponent;
  let fixture: ComponentFixture<ServiceSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
