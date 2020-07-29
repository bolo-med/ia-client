import { TestBed } from '@angular/core/testing';

import { ModeliService } from './modeli.service';

describe('ModeliService', () => {
  let service: ModeliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
