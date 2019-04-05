import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

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

  findEmployeeByRoles(roles) {
    return this.http.post( environment.endpoint + "/api/employees/roles", roles);
  }

  findRecentDOBOfEmployee() {
    return this.http.get(environment.endpoint + "/api/employees/recentdob");
  }

  findBasketByEmployeeId(id) {
    return this.http.get(environment.endpoint + "/api/basket/" + id);
  }

  insertGroupIntoEmployee(id, data) {
    return this.http.patch(environment.endpoint + "/api/employees/addgroup/"+ id , data);
  }

  findAllMemberOfAGroup(id) {
    return this.http.get(environment.endpoint + "/api/employees/group-member/" + id);
  }

  removeEmployeeFromGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/employees/delgroup/" + id, data);
  }

  findFrezeerByOwner(id) {
    return this.http.get(environment.endpoint + "/api/freezer/by-owner/" + id);
  }

  findAchievementbyEmployee(id) {
    return this.http.get(environment.endpoint + "/api/employees/achievement?empId=" + id);
  }
}
