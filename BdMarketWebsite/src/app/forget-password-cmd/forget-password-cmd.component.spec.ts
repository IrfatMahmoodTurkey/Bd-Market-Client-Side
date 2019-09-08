import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordCmdComponent } from './forget-password-cmd.component';

describe('ForgetPasswordCmdComponent', () => {
  let component: ForgetPasswordCmdComponent;
  let fixture: ComponentFixture<ForgetPasswordCmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordCmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
