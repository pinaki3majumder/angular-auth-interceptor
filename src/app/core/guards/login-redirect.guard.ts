import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const loginRedirectGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticatedUser()) {
    return true;
  }
  router.navigate(['/dashboard']);
  return false;
};
