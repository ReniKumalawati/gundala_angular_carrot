import { Component, OnInit } from '@angular/core';

import {DataService} from '../service/data.service'
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: Object;
  user: any;
  constructor(private data: DataService, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.user = JSON.parse(this.authentication.currentEmployee());
    this.data.getUsers().subscribe(data => {
      this.users = data
    })
  }


}
