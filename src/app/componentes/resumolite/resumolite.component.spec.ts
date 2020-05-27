import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoliteComponent } from './resumolite.component';

describe('ResumoliteComponent', () => {
  let component: ResumoliteComponent;
  let fixture: ComponentFixture<ResumoliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumoliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
