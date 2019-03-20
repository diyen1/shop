import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryCellComponent } from './date-cell.component';

describe('ImageCellComponent', () => {
  let component: PrimaryCellComponent;
  let fixture: ComponentFixture<PrimaryCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
