import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  loading = false;
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

    this.loading = true;

    setTimeout(() => {
      const token = 'demo.' + btoa(this.email) + '.token';
      const user = {
        id: 1,
        username:
          this.mode === 'register'
            ? this.username.trim()
            : this.email.split('@')[0],
        email: this.email
      };

      this.auth.setSession({ access_token: token, user });
      this.loading = false;

      if (this.mode === 'register') {
        this.success = 'Account created successfully!';
      } else {
        this.success = 'Login successful!';
      }

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 500);
    }, 700);
  }
}