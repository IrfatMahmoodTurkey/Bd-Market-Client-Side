import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCmpComponent } from './profile-cmp.component';

describe('ProfileCmpComponent', () => {
  let component: ProfileCmpComponent;
  let fixture: ComponentFixture<ProfileCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
