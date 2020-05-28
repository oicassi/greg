import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreesoundliteComponent } from './freesoundlite.component';

describe('FreesoundliteComponent', () => {
  let component: FreesoundliteComponent;
  let fixture: ComponentFixture<FreesoundliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreesoundliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreesoundliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
