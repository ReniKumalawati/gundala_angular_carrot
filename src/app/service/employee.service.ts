import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  login(data) {
    return this.http.post( environment.endpoint + "/login", data);
  }

  findEmployeeByRole(role) {
    return this.http.get( environment.endpoint + "/api/employees/role?role=" + role);
  }

  findRecentDOBOfEmployee() {
    return this.http.get(environment.endpoint + "/api/employees/recentdob");
  }

  findBasketByEmployeeId(id) {
    return this.http.get(environment.endpoint + "/api/basket/" + id);
  }

  insertGroupIntoEmployee(id, data) {
    return this.http.patch(environment.endpoint + "/api/employees/" + id + "/updgroup", data);
  }
}
