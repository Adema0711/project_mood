import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const isAuthRequest =
    req.url.includes('/api/login/') ||
    req.url.includes('/api/register/') ||
    req.url.includes('/api/token/refresh/');

  const authReq =
    token && !isAuthRequest
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        })
      : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401 && !isAuthRequest) {
        auth.logout();
      }
      return throwError(() => err);
    })
  );
};