import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCellComponent } from './date-cell.component';

describe('PriceCellComponent', () => {
  let component: PriceCellComponent;
  let fixture: ComponentFixture<PriceCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
