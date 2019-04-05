import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {BazarService} from '../../service/bazar.service';
import {TransactionService} from '../../service/transaction.service';
import {ItemServiceService} from '../../service/item-service.service';

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
    private auth: AuthenticationService,
    private bazarService: BazarService,
    private transactionService: TransactionService,
    private itemService: ItemServiceService
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
            this.sf.push(b);
          }
        }
      }
    }
  }
}
