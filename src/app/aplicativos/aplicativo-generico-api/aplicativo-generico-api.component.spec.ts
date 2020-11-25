import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoGenericoApiComponent } from './aplicativo-generico-api.component';

describe('AplicativoGenericoApiComponent', () => {
  let component: AplicativoGenericoApiComponent;
  let fixture: ComponentFixture<AplicativoGenericoApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicativoGenericoApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicativoGenericoApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
