import { TestBed } from '@angular/core/testing';

import { InMemoryDataFakeBooksService } from './in-memory-data-fake-books.service';

describe('InMemoryDataFakeBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryDataFakeBooksService = TestBed.get(InMemoryDataFakeBooksService);
    expect(service).toBeTruthy();
  });
});
