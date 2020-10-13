import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingButtonsComponent } from './landing-buttons.component';

describe('LandingButtonsComponent', () => {
  let component: LandingButtonsComponent;
  let fixture: ComponentFixture<LandingButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
