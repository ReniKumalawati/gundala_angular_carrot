import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let employee = JSON.parse(this.auth.currentEmployee())
    if (employee) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + employee.token
        }
      });
      return next.handle(req);
    }
    return next.handle(req);
  }
}
