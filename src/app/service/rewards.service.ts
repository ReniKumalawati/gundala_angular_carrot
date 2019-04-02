import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private http: HttpClient) { }
  findAllRewards() {
    return this.http.get(environment.endpoint + '/api/achievement');
  }

  insertRewardIntoDB(data) {
    return this.http.post(environment.endpoint + '/api/achievement', data);
  }

  deleteRewardFromDB(id) {
    return this.http.delete(environment.endpoint + '/api/achievement/' + id);
  }

  updateReward(data, id) {
    return this.http.put(environment.endpoint + '/api/achievement/' + id, data);
  }
}
