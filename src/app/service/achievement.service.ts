import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementService{

  constructor(private http: HttpClient) { }
  findAllAchievement() {
    return this.http.get(environment.endpoint + '/api/achievement');
  }

  insertAchievementIntoDB(data) {
    return this.http.post(environment.endpoint + '/api/achievement', data);
  }

  deleteAchievementFromDB(id) {
    return this.http.delete(environment.endpoint + '/api/achievement/' + id);
  }

  insertAchievementIntoGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/add-achievement/"+ id , data);
  }


  removeAchievementFromGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/del-achievement/" + id, data);
  }
}
