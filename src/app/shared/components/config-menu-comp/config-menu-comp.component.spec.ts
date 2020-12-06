import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMenuCompComponent } from './config-menu-comp.component';

describe('ConfigMenuCompComponent', () => {
  let component: ConfigMenuCompComponent;
  let fixture: ComponentFixture<ConfigMenuCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigMenuCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMenuCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
