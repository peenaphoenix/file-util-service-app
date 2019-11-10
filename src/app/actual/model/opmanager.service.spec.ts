import { TestBed } from '@angular/core/testing';

import { OpmanagerService } from './opmanager.service';

describe('OpmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpmanagerService = TestBed.get(OpmanagerService);
    expect(service).toBeTruthy();
  });
});
