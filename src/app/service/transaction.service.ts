import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  employee : any;
  constructor(private http: HttpClient) { }

  ngOnInit() {}

  findAllTransactionByEmployeeId(id) {
    return this.http.get(environment.endpoint + '/api/transactions/' + id);
  }

  insertTansactionToDB(data) {
    return this.http.post(environment.endpoint + '/api/transactions', data);
  }

  findAllTransactionPending() {
    return this.http.get(environment.endpoint + '/api/transactions/pending');
  }

  approve (id) {
    return this.http.patch(environment.endpoint + '/api/transactions/approve?id=' + id, {});
  }

  decline (id) {
    return this.http.patch(environment.endpoint + '/api/transactions/decline?id=' + id, {});
  }

  findTransactionByBazar(id) {
    return this.http.get(environment.endpoint + '/api/transactions/by-bazaar/' + id);
  }

  getEarnedCarrot(id) {
    return this.http.get(environment.endpoint + '/api/transactions/total-earned/' + id);
  }

  findTransactionByStatusAndDate(data) {
    return this.http.get(environment.endpoint + '/api/transactions/by-date-status?type=' + data.type + "&&startDate=" + data.from + "&&endDate=" + data.to);
  }

  approveDonation(id) {
    return this.http.patch(environment.endpoint + '/api/transactions/approve-donation?id=' + id, {});
  }
}
