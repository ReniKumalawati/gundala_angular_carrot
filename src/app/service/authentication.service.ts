import { Injectable } from '@angular/core';
import {EmployeeService} from './employee.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private data : EmployeeService) {}

  public currentEmployee() {
    return localStorage.getItem('currentUser');
  }

  login(email: string, password: string) {
    return this.data.login({email: email, password: password});
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
