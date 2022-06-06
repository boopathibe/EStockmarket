import { TestBed } from '@angular/core/testing';

import { CanActivateRouteGuard} from './can-activate-route.guard.service';

describe('CanActivateRoute.GuardService', () => {
  let service: CanActivateRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateRouteGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
