import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  postNewsletter(data) {
    return this.http.post(environment.endpoint + '/api/newsletter', data);
  }
}
