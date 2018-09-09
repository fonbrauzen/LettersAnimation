import { TestBed, inject } from '@angular/core/testing';

import { LettersEventsService } from './letters-events.service';

describe('LettersEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LettersEventsService]
    });
  });

  it('should be created', inject([LettersEventsService], (service: LettersEventsService) => {
    expect(service).toBeTruthy();
  }));
});
