import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditServiceComponent } from './admin-edit-service.component';

describe('ReportDialogComponent', () => {
  let component: AdminEditServiceComponent;
  let fixture: ComponentFixture<AdminEditServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
