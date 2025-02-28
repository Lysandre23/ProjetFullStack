import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const userId = authService.getUserId();
  
  if (userId) {
    // Add userId as a query parameter for relevant endpoints
    if (req.url.includes('/api/reservations') || 
        req.url.includes('/api/specialists') ||
        req.url.includes('/api/centers')) {
      const modifiedRequest = req.clone({
        params: req.params.set('patientId', userId.toString())
      });
      return next(modifiedRequest);
    }
  }
  
  return next(req);
}; 