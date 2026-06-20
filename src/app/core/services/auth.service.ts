import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  token = signal<string | null>(null);
  currentUser = signal<AuthResponse | null>(null);

  constructor() {
    this.loadSession();
  }

  private loadSession(): void {
    if (!this.isBrowser || this.token() !== null || this.currentUser() !== null) {
      return;
    }

    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken) {
      this.token.set(savedToken);
    }

    if (savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  private getStoredToken(): string | null {
    if (!this.isBrowser || typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem('token');
  }

  hasStoredToken(): boolean {
    return this.getStoredToken() !== null;
  }

  login(username: string, password: string): Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>('https://dummyjson.com/auth/login', {
      username,
      password,
      expiresInMins: 60
    }).pipe(
      tap(response => {
        this.currentUser.set(response);
        if (this.isBrowser) {
          this.token.set(response.accessToken);
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response));
        }
      }),
      catchError(() => of(null))
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.token.set(null);
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    if (this.currentUser() !== null || this.token() !== null) {
      return true;
    }

    if (this.isBrowser) {
      this.loadSession();
    }

    return this.currentUser() !== null || this.token() !== null;
  }
}
