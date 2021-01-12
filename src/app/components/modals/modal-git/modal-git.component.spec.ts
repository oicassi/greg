import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGitComponent } from './modal-git.component';

describe('ModalAplicativoComponent', () => {
  let component: ModalGitComponent;
  let fixture: ComponentFixture<ModalGitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
