// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStore } from '../features/user/user.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private userStore = inject(UserStore);

  canActivate(): boolean | UrlTree {
    if (this.userStore.isLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']); 
    }
  }
}