import { TestBed } from '@angular/core/testing';

import { StatusiService } from './statusi.service';

describe('StatusiService', () => {
  let service: StatusiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
