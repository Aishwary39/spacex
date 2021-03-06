import { TestBed, inject } from '@angular/core/testing';

import { SpacexProgramService } from './spacex-program.service';

describe('SpacexProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpacexProgramService]
    });
  });

  it('should be created', inject([SpacexProgramService], (service: SpacexProgramService) => {
    expect(service).toBeTruthy();
  }));
});
