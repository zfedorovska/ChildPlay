import { TestBed, async, inject } from '@angular/core/testing';

import { ActivityEditGuard } from './activity-edit.guard';

describe('ProductEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityEditGuard]
    });
  });

  it('should ...', inject([ActivityEditGuard], (guard: ActivityEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
