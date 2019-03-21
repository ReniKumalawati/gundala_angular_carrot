import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  findItemByBazarId(id) {
    return this.http.get(environment.endpoint + '/api/items/findByBazaarId?id=' + id);
  }

  findItemByMultipleBazarId(data) {
    return this.http.post(environment.endpoint + '/api/items/findByMultipleBazaarId', data);
  }

  deleteItemById(id) {
    return this.http.delete(environment.endpoint + '/api/items/' + id);
  }

  insertItemIntoDB(data) {
    return this.http.post(environment.endpoint + '/api/items', data);
  }

  findItemById(id) {
    return this.http.get(environment.endpoint + '/api/items/' + id );
  }

  updateItemById(id, data) {
    return this.http.put(environment.endpoint + '/api/items/' + id, data );
  }
}
