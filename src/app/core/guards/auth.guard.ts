import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    // During SSR we cannot access browser storage, so allow the page to render
    // and let the client-side auth guard handle the actual token check.
    return true;
  }

  if (authService.isAuthenticated() || authService.hasStoredToken()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};