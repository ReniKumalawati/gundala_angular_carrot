import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialFoundationService {

  constructor(private http: HttpClient) { }
  findAllSocialFoundation() {
    return this.http.get(environment.endpoint + '/api/socialfoundations');
  }

  insertSocialFoundationIntoDB(data) {
    return this.http.post(environment.endpoint + "/api/socialfoundations", data);
  }

  insertSocialFoundationIntoGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/add-social/" + id, data);
  }

  removeSocialFoundationIntoGroup(id, data) {
    return this.http.patch(environment.endpoint + "/api/groups/del-social/" + id, data);
  }

  updateSocialFoundation(data, id) {
    return this.http.put(environment.endpoint + "/api/socialfoundations/" + id, data);
  }

  deleteSocialFoundationFromDB(id){
    return this.http.delete(environment.endpoint + "/api/socialfoundations/" + id);
  }

  findSFById(id) {
    return this.http.get(environment.endpoint + "/api/socialfoundations/" + id);
  }

  uploadImage(id, data) {
    return this.http.post(environment.endpoint + '/api/socialfoundations/uploadImage/' + id, data);
  }
}
