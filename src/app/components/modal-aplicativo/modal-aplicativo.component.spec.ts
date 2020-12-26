import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAplicativoComponent } from './modal-aplicativo.component';

describe('ModalAplicativoComponent', () => {
  let component: ModalAplicativoComponent;
  let fixture: ComponentFixture<ModalAplicativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAplicativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAplicativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
