import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductCmpComponent } from './all-product-cmp.component';

describe('AllProductCmpComponent', () => {
  let component: AllProductCmpComponent;
  let fixture: ComponentFixture<AllProductCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
