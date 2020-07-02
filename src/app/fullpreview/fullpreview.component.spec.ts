import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpreviewComponent } from './fullpreview.component';

describe('FullpreviewComponent', () => {
  let component: FullpreviewComponent;
  let fixture: ComponentFixture<FullpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
