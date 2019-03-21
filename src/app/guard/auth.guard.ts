import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route);
    // return false;
    if (location.pathname == '/login') {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        location.href = '/'
        console.log('aa');
        return false;
      }
      console.log('bb');
      return true;
    } else {
      if (typeof localStorage.getItem('currentUser') == 'string') {
        return true;
      }
      localStorage.clear();
      location.href = '/login'
      return false;
    }
  }

}
