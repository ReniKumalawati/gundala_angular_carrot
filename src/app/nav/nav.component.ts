import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = 'Mitrais Carrot';
  constructor() { }

  ngOnInit() {
    console.log('naaavvvv')
  }

  onClick(){
      localStorage.removeItem('currentUser');
      // localStorage.clear(); //ini bisa juga buat hapus semua data di localStorage
  }
}
