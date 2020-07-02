import { TestBed } from '@angular/core/testing';

import { PreviewService } from './preview.service';

describe('PreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreviewService = TestBed.get(PreviewService);
    expect(service).toBeTruthy();
  });
});
