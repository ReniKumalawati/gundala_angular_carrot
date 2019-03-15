import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (location.pathname == '/login') {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        location.href = '/'
        return false;
      }
      return true;
    } else {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
      }

      location.href = '/login'
      return false;
    }
  }
}
