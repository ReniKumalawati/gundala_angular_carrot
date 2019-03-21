import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';
import {Bazar} from '../models/bazar';

@Injectable({
  providedIn: 'root'
})
export class BazarService {

  constructor(private http: HttpClient) {}

  insertIntoDB (data) {
    return this.http.post(environment.endpoint + "/api/bazaar", data);
  }

  findAllBazars() {
    return this.http.get(environment.endpoint + "/api/bazaar");
  }

  findBazarById(id) {
    return this.http.get(environment.endpoint + "/api/bazaar/" + id);
  }

  updateBazarById(id, data) {
    return this.http.put(environment.endpoint + "/api/bazaar/" + id, data);
  }

  findBazarByStatus(status) {
    return this.http.get(environment.endpoint + "/api/bazaar/status?status=" + status);
  }

  insertGroupIntoBazaar(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/add-bazaar/" + id, data);
  }

  removeGroupFrpmBazar(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/del-bazaar/" + id, data);
  }
}
