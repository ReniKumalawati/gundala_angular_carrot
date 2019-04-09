import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-all-social-foundation',
  templateUrl: './all-social-foundation.component.html',
  styleUrls: ['./all-social-foundation.component.scss']
})
export class AllSocialFoundationComponent implements OnInit {
  employee: any;
  bazar = [];
  sf = [];
  basket: any;
  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());
    this.findSF();
  }

  findSF() {
    const group = this.employee.group;
    if (group) {
      for (let g of group) {
        if (g.socialFoundations !== undefined) {
          for (let b of g.socialFoundations) {
            if (b.status === true) {
              this.sf.push(b);
            }
          }
        }
      }
    }
  }
}
