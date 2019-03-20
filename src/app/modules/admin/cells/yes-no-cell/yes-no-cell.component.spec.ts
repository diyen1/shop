import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoCellComponent } from './yes-no-cell.component';

describe('ImageCellComponent', () => {
  let component: YesNoCellComponent;
  let fixture: ComponentFixture<YesNoCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
