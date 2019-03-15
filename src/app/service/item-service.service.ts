import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  findItemByBazarId(id) {
    return this.http.get(environment.endpoint + "/api/item/findByBazaarId?id=" + id);
  }

  deleteItemById(id) {
    return this.http.delete(environment.endpoint + "/api/item?id=" + id)
  }
}
