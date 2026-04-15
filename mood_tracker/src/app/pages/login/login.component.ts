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

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/home']);
  }

  switchMode(m: 'login' | 'register') {
    this.mode = m;
    this.error = '';
  }

  onSubmit() {
    this.error = '';
    if (!this.email || !this.password) { this.error = 'Please fill in all fields'; return; }
    if (this.mode === 'register' && this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match'; return;
    }
    if (this.password.length < 4) { this.error = 'Password is too short (minimum 4 characters)'; return; }

    this.loading = true;

    setTimeout(() => {
      const token = 'demo.' + btoa(this.email) + '.token';
      const user = {
        id: 1,
        username: this.mode === 'register' ? (this.username || this.email.split('@')[0]) : this.email.split('@')[0],
        email: this.email
      };
      this.auth.setSession({ access_token: token, user });
      this.loading = false;
      this.router.navigate(['/home']);
    }, 700);
  }
}