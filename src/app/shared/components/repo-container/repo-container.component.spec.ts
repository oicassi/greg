import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoContainerComponent } from './repo-container.component';

describe('RepoContainerComponent', () => {
  let component: RepoContainerComponent;
  let fixture: ComponentFixture<RepoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
