import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAttributeDisplayComponent } from './crud-attribute-display.component';

describe('CrudReadSingleComponent', () => {
  let component: CrudAttributeDisplayComponent;
  let fixture: ComponentFixture<CrudAttributeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAttributeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAttributeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
