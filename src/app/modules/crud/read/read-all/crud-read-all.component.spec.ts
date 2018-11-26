import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudReadAllComponent } from './crud-read-all.component';

describe('CrudReadSingleComponent', () => {
  let component: CrudReadAllComponent;
  let fixture: ComponentFixture<CrudReadAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudReadAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudReadAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
