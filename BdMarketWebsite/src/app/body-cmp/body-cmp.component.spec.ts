import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCmpComponent } from './body-cmp.component';

describe('BodyCmpComponent', () => {
  let component: BodyCmpComponent;
  let fixture: ComponentFixture<BodyCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
