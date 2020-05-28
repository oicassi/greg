import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreesoundComponent } from './freesound.component';

describe('FreesoundComponent', () => {
  let component: FreesoundComponent;
  let fixture: ComponentFixture<FreesoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreesoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreesoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
