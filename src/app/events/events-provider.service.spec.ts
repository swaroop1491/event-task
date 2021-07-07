import { TestBed } from '@angular/core/testing';

import { EventsProviderService } from './events-provider.service';

describe('EventsProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsProviderService = TestBed.get(EventsProviderService);
    expect(service).toBeTruthy();
  });
});
