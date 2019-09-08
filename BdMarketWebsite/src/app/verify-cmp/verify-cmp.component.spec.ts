import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCmpComponent } from './verify-cmp.component';

describe('VerifyCmpComponent', () => {
  let component: VerifyCmpComponent;
  let fixture: ComponentFixture<VerifyCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
