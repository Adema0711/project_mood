import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string | null;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  currentUser = signal<User | null>(this.loadUser());
  isLoggedIn = signal<boolean>(!!localStorage.getItem('jwt_token'));

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, { email, password }).pipe(
      tap(res => this.setSession(res)),
      catchError(err => throwError(() => err))
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, {
      username,
      email,
      password
    }).pipe(
      tap(res => this.setSession(res)),
      catchError(err => throwError(() => err))
    );
  }

  logout() {
    const refresh = localStorage.getItem('refresh_token');

    if (refresh) {
      this.http.post(`${this.apiUrl}/logout/`, { refresh }).subscribe({
        next: () => this.clearSession(),
        error: () => this.clearSession()
      });
    } else {
      this.clearSession();
    }
  }

  private clearSession() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  setSession(res: AuthResponse) {
    localStorage.setItem('jwt_token', res.access_token);

    if (res.refresh_token) {
      localStorage.setItem('refresh_token', res.refresh_token);
    }

    localStorage.setItem('current_user', JSON.stringify(res.user));
    this.currentUser.set(res.user);
    this.isLoggedIn.set(true);
  }

  private loadUser(): User | null {
    const u = localStorage.getItem('current_user');
    return u ? JSON.parse(u) : null;
  }
}