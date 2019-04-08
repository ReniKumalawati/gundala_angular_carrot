import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from './employee.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  findAllUnreadNotif(id) {
    return this.http.get(environment.endpoint + '/api/notifications/emp/' + id);
  }

  updateNotif(data) {
    data.read = true;
    return this.http.put(environment.endpoint + '/api/notifications/emp/' + data.id, data);
  }
}
