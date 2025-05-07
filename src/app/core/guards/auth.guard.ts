import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('User is authenticated');
    
    return true;
  }

  // Redirect to the login page
  router.navigate(['/auth/sign-in']);
  return false;
};


export const loggedInGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    console.log('User is authenticated');
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
}

// Role-based guard
export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isADMIN()) {
    return true;
  }

  // If user is authenticated but not admin, redirect to dashboard
  // Otherwise redirect to login
  if (authService.isAuthenticated()) {
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/auth/sign-in']);
  }
  return false;
};