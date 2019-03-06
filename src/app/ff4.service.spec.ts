import { TestBed } from '@angular/core/testing';

import { Ff4Service } from './ff4.service';

describe('Ff4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ff4Service = TestBed.get(Ff4Service);
    expect(service).toBeTruthy();
  });
});
