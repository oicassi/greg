import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoBaseComponent } from './aplicativo-base.component';

describe('AplicativoBaseComponent', () => {
  let component: AplicativoBaseComponent;
  let fixture: ComponentFixture<AplicativoBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicativoBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicativoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
