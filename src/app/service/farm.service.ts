import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private http: HttpClient) { }
  findAllBarns() {
    return this.http.get(environment.endpoint + '/api/barns');
  }
  insertBarnIntoDB(data) {
    return this.http.post(environment.endpoint + '/api/barns', data);
  }
  updateBarnInDB(data, id) {
    return this.http.put(environment.endpoint + '/api/barns?id=' + id, data);
  }
  deleteBarnInDB(id) {
    return this.http.delete(environment.endpoint + '/api/barns?id=' + id);
  }
  findCurrentBarns() {
    return this.http.get(environment.endpoint + '/api/barns/current-barn');
  }
}
