import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedComponentComponent } from './related-component.component';

describe('RelatedComponentComponent', () => {
  let component: RelatedComponentComponent;
  let fixture: ComponentFixture<RelatedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
