import { TestBed } from '@angular/core/testing';

import { ProverbService } from './proverb.service';

describe('ProverbService', () => {
  let service: ProverbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProverbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
