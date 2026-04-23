import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login';

  email = '';
  password = '';
  username = '';
  confirmPassword = '';

  loading = signal(false);
  error = '';
  success = '';

  showPassword = false;
  showConfirmPassword = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  switchMode(m: 'login' | 'register') {
    this.mode = m;
    this.clearMessages();
    this.password = '';
    this.confirmPassword = '';
  }

  clearMessages() {
    this.error = '';
    this.success = '';
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isFormValid(): boolean {
    if (!this.email || !this.password) return false;
    if (!this.isValidEmail(this.email)) return false;
    if (this.password.length < 4) return false;

    if (this.mode === 'register') {
      if (!this.username.trim()) return false;
      if (!this.confirmPassword) return false;
      if (this.password !== this.confirmPassword) return false;
    }

    return true;
  }

  onSubmit() {
    this.clearMessages();

    if (!this.email || !this.password) {
      this.error = 'Please fill in all required fields';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    if (this.password.length < 4) {
      this.error = 'Password is too short (minimum 4 characters)';
      return;
    }

    if (this.mode === 'register') {
      if (!this.username.trim()) {
        this.error = 'Username is required';
        return;
      }

      if (!this.confirmPassword) {
        this.error = 'Please confirm your password';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }
    }

    this.loading.set(true);

    if (this.mode === 'login') {
      this.auth.login(this.email, this.password).subscribe({
        next: () => {
          this.loading.set(false);
          this.success = 'Login successful!';
          setTimeout(() => this.router.navigate(['/home']), 500);
        },
        error: (err) => {

          this.loading.set(false);

          if (err?.status === 401) {
            this.error = 'Invalid email or password';
          } else if (err?.status === 0) {
            this.error = 'Cannot connect to server';
          } else {
            this.error = err?.error?.detail || err?.error?.error || 'Login failed';
          }
        }
      });
    } else {
      this.auth.register(this.username.trim(), this.email, this.password).subscribe({
        next: () => {
          this.loading.set(false);
          this.success = 'Account created successfully!';
          setTimeout(() => this.router.navigate(['/home']), 500);
        },
        error: (err) => {
          this.loading.set(false);

          if (err?.error?.email) {
            this.error = err.error.email[0];
          } else if (err?.error?.username) {
            this.error = err.error.username[0];
          } else if (err?.error?.password) {
            this.error = err.error.password[0];
          } else if (err?.error?.detail) {
            this.error = err.error.detail;
          } else {
            this.error = 'Registration failed';
          }
        }
      });
    }
  }
}