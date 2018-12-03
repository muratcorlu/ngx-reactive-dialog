import { TestBed } from '@angular/core/testing';

import { ReactiveDialogService } from './reactive-dialog.service';

describe('ReactiveDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactiveDialogService = TestBed.get(ReactiveDialogService);
    expect(service).toBeTruthy();
  });
});
