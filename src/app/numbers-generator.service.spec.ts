import { TestBed } from '@angular/core/testing';

import { NumbersGeneratorService } from './numbers-generator.service';

describe('NumbersGeneratorService', () => {
  let service: NumbersGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumbersGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
