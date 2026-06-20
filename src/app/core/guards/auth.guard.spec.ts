import { Injector, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

type AuthGuardTestOptions = {
  platformId: string;
  isAuthenticated?: () => boolean;
  hasStoredToken?: () => boolean;
  navigate?: ReturnType<typeof vi.fn>;
};

function runAuthGuard(options: AuthGuardTestOptions): boolean {
  const navigate = options.navigate ?? vi.fn().mockResolvedValue(true);

  const injector = Injector.create({
    providers: [
      { provide: PLATFORM_ID, useValue: options.platformId },
      {
        provide: AuthService,
        useValue: {
          isAuthenticated: options.isAuthenticated ?? (() => false),
          hasStoredToken: options.hasStoredToken ?? (() => false),
        },
      },
      { provide: Router, useValue: { navigate } },
    ],
  });

  return runInInjectionContext(injector, () => authGuard({} as never, {} as never)) as boolean;
}

describe('authGuard', () => {
  describe('Happy Paths', () => {
    it('should allow activation when running on server-side (SSR)', () => {
      const result = runAuthGuard({ platformId: 'server' });

      expect(result).toBe(true);
    });

    it('should allow activation when user is authenticated in browser', () => {
      const isAuthenticated = vi.fn().mockReturnValue(true);

      const result = runAuthGuard({
        platformId: 'browser',
        isAuthenticated,
      });

      expect(result).toBe(true);
      expect(isAuthenticated).toHaveBeenCalled();
    });

    it('should allow activation when user has stored token in browser', () => {
      const isAuthenticated = vi.fn().mockReturnValue(false);
      const hasStoredToken = vi.fn().mockReturnValue(true);

      const result = runAuthGuard({
        platformId: 'browser',
        isAuthenticated,
        hasStoredToken,
      });

      expect(result).toBe(true);
      expect(isAuthenticated).toHaveBeenCalled();
      expect(hasStoredToken).toHaveBeenCalled();
    });

    it('should redirect to /login and deny activation when not authenticated and no token in browser', () => {
      const isAuthenticated = vi.fn().mockReturnValue(false);
      const hasStoredToken = vi.fn().mockReturnValue(false);
      const navigate = vi.fn().mockResolvedValue(true);

      const result = runAuthGuard({
        platformId: 'browser',
        isAuthenticated,
        hasStoredToken,
        navigate,
      });

      expect(result).toBe(false);
      expect(navigate).toHaveBeenCalledWith(['/login']);
      expect(isAuthenticated).toHaveBeenCalled();
      expect(hasStoredToken).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle when AuthService.isAuthenticated throws an error', () => {
      expect(() =>
        runAuthGuard({
          platformId: 'browser',
          isAuthenticated: () => {
            throw new Error('Auth check failed');
          },
        })
      ).toThrow('Auth check failed');
    });

    it('should handle when Router.navigate throws an error', () => {
      const navigate = vi.fn().mockImplementation(() => {
        throw new Error('Navigation failed');
      });

      expect(() =>
        runAuthGuard({
          platformId: 'browser',
          navigate,
        })
      ).toThrow('Navigation failed');
    });

    it('should handle when AuthService methods are missing', () => {
      const injector = Injector.create({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: AuthService, useValue: {} },
          { provide: Router, useValue: { navigate: vi.fn() } },
        ],
      });

      expect(() =>
        runInInjectionContext(injector, () => authGuard({} as never, {} as never))
      ).toThrow();
    });
  });
});
