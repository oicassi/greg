import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoBasicInfoComponent } from './aplicativo-basic-info.component';

describe('AplicativoBasicInfoComponent', () => {
  let component: AplicativoBasicInfoComponent;
  let fixture: ComponentFixture<AplicativoBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicativoBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicativoBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
