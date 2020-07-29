import { TestBed } from '@angular/core/testing';

import { ProizvodjaciService } from './proizvodjaci.service';

describe('ProizvodjaciService', () => {
  let service: ProizvodjaciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProizvodjaciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
