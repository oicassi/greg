import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoComponent } from './texto.component';

describe('TextoComponent', () => {
  let component: TextoComponent;
  let fixture: ComponentFixture<TextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
