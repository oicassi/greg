import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrliteComponent } from './flickrlite.component';

describe('FlickrliteComponent', () => {
  let component: FlickrliteComponent;
  let fixture: ComponentFixture<FlickrliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlickrliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
