import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoHeaderComponent } from './aplicativo-header.component';

describe('AplicativoHeaderComponent', () => {
  let component: AplicativoHeaderComponent;
  let fixture: ComponentFixture<AplicativoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicativoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicativoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
