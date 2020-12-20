import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditControlComponent } from './edit-control.component';

describe('EditControlComponent', () => {
  let component: EditControlComponent;
  let fixture: ComponentFixture<EditControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
