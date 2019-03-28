import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private data : EmployeeService) { }
  findAllEmployee(){
    return this.http.get(environment.endpoint + '/api/employees');
  }
  updateEmployeeIntoDB(data, id){
    console.log('data di request update' + JSON.stringify(data));
    console.log('id di request' + JSON.stringify(id));
    return this.http.patch(environment.endpoint + '/api/employees/' + id, data);
  }
  findEmployeeById(id){
    return this.http.get(environment.endpoint + '/api/employees/' + id);
  }
  login(email: string, password: string) {
    return this.data.login({email: email, password: password});
  }
  uploadEmployeeImage(id, data) {
    console.log('data di request upload' + JSON.stringify(data));
    return this.http.post(environment.endpoint + '/api/employees/uploadImage/' + id, data );
  }
}
