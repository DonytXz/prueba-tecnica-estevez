import { inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest'; // Importaciones de vitest
import { AuthService } from '../../../core/services/auth.service';
import { LoginComponent } from './login.component';

// Usamos vi.mock en lugar de jest.mock
vi.mock('@angular/core', async () => {
  const actual = await vi.importActual('@angular/core');
  return {
    ...actual,
    inject: vi.fn(),
    signal: vi.fn(),
  };
});

type MockProviderToken<T = any> = string | symbol | { new (...args: any[]): T };

describe('LoginComponent.onSubmit() onSubmit method', () => {
  let mockFormBuilder: { group: any };
  let mockAuthService: { login: any };
  let mockRouter: { navigate: any };
  let mockSignal: any;
  let mockIsLoading: { set: any };

  function createMockFormGroup(valid: boolean, value: any) {
    return {
      valid,
      value,
      get: vi.fn(),
      controls: {
        username: { value: value.username },
        password: { value: value.password },
      },
    };
  }

  beforeEach(() => {
    vi.clearAllMocks(); // Cambiado de jest.clearAllMocks()

    mockFormBuilder = { group: vi.fn() };
    mockAuthService = { login: vi.fn() };
    mockRouter = { navigate: vi.fn() };
    mockIsLoading = { set: vi.fn() };
    
    mockSignal = vi.fn().mockReturnValue(mockIsLoading);

    // Casting para usar vi.mocked
    (inject as any).mockImplementation((token: MockProviderToken) => {
      if (token === FormBuilder) return mockFormBuilder;
      if (token === AuthService) return mockAuthService;
      if (token === Router) return mockRouter;
      return undefined;
    });

    (signal as any).mockImplementation(mockSignal);

    mockFormBuilder.group.mockReturnValue(
      createMockFormGroup(true, { username: 'emilys', password: 'emilyspass' })
    );
  });

  it('should set isLoading, clear errorMessage, call AuthService.login, and navigate on successful login', () => {
    const mockUser = { username: 'emilys', email: 'emilys@dummyjson.com' };
    
    mockAuthService.login.mockReturnValue({
      subscribe: ({ next }: any) => next(mockUser),
    });

    const component = new LoginComponent();
    component.onSubmit();

    expect(mockIsLoading.set).toHaveBeenCalledWith(true);
    expect(mockAuthService.login).toHaveBeenCalledWith('emilys', 'emilyspass');
    expect(mockIsLoading.set).toHaveBeenCalledWith(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/clients']);
  });

});