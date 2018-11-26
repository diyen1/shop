import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudReadSingleComponent } from './crud-read-single.component';

describe('CrudReadSingleComponent', () => {
  let component: CrudReadSingleComponent;
  let fixture: ComponentFixture<CrudReadSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudReadSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudReadSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
