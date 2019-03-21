import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let permission: any;
    permission = route.data.permission;
    if (location.pathname == '/login') {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        location.href = '/'
        return false;
      }
      return true;
    } else {
      if (typeof localStorage.getItem('currentUser') == 'string') {
        let user: any;
        user = JSON.parse(localStorage.getItem('currentUser'))
        if (permission.includes(user.role)) {
          return true;
        } else {
          alert('Anda tidak boleh mengakses halaman ini');
          location.href = '/employee'
          return false;
        }
      }
      localStorage.clear();
      location.href = '/login'
      return false;
    }
  }

}
