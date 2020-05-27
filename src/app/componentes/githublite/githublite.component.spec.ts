import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubliteComponent } from './githublite.component';

describe('GithubliteComponent', () => {
  let component: GithubliteComponent;
  let fixture: ComponentFixture<GithubliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
