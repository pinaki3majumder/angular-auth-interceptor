import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticatedUser()) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
