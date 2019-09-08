import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCmpComponent } from './category-cmp.component';

describe('CategoryCmpComponent', () => {
  let component: CategoryCmpComponent;
  let fixture: ComponentFixture<CategoryCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
