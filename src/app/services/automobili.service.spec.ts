import { TestBed } from '@angular/core/testing';

import { AutomobiliService } from './automobili.service';

describe('AutomobiliService', () => {
  let service: AutomobiliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomobiliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
