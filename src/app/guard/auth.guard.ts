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
        console.log('aa');
        return false;
      }
      console.log('bb');
      return true;
    } else {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        // location.href = '/src/app/login/login.component.html'
        console.log('cc');
        return true;
      }

      console.log('dd');
      location.href = '/login'
      return false;
    }
  }

}
