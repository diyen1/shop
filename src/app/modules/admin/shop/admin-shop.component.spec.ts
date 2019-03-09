import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopComponent } from './shop.component';

describe('ServicesListComponent', () => {
  let component: AdminShopComponent;
  let fixture: ComponentFixture<AdminShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
