import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoGenericoComponent } from './aplicativo-generico.component';

describe('AplicativoGenericoComponent', () => {
  let component: AplicativoGenericoComponent;
  let fixture: ComponentFixture<AplicativoGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicativoGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicativoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
