import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCmpComponent } from './cart-cmp.component';

describe('CartCmpComponent', () => {
  let component: CartCmpComponent;
  let fixture: ComponentFixture<CartCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
