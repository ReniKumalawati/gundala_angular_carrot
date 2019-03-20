import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  findAllGroup () {
    return this.http.get(environment.endpoint + "/api/groups");
  }

  insertGroupToDB(data) {
    return this.http.post(environment.endpoint + "/api/groups", data);
  }

  findById(id) {
    return this.http.get(environment.endpoint + "/api/groups/" + id);
  }
}
