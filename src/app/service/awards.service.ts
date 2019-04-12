import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor(private http: HttpClient) { }
  findAllAwards () {
    return this.http.get(environment.endpoint + "/api/awards");
  }

  insertAwardIntoDB (data) {
    return this.http.post(environment.endpoint + "/api/awards", data);
  }

  updateAward (data, id) {
    return this.http.put(environment.endpoint + "/api/awards/" + id, data);
  }

  deleteAwardFromDB(id) {
    return this.http.delete(environment.endpoint + "/api/awards/" + id);
  }
  insertAwardIntoGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/add-award/"+ id , data);
  }
  removeAwardFromGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/del-award/" + id, data);
  }

}
