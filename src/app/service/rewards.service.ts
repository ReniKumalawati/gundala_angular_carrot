import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private http: HttpClient) { }
  findAllRewards () {
    return this.http.get(environment.endpoint + "/api/rewards");
  }

  insertRewardIntoDB (data) {
    return this.http.post(environment.endpoint + "/api/rewards", data);
  }

  deleteRewardFromDB(id) {
    return this.http.delete(environment.endpoint + "/api/rewards/" + id);
  }
}
