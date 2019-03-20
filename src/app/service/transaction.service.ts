import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  findAllTransactionByEmployeeId(id) {
    return this.http.get(environment.endpoint + '/api/transactions/' + id);
  }

  insertTansactionToDB(data) {
    return this.http.post(environment.endpoint + '/api/transactions', data);
  }
}
