import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoControlComponent } from './aplicativo-control.component';

describe('AplicativoControlComponent', () => {
  let component: AplicativoControlComponent;
  let fixture: ComponentFixture<AplicativoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicativoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicativoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
