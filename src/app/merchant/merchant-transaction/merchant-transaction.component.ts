import { Component, OnInit } from '@angular/core';
import {BazarService} from '../../service/bazar.service';
import {AuthenticationService} from '../../service/authentication.service';
import {TransactionService} from '../../service/transaction.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-merchant-transaction',
  templateUrl: './merchant-transaction.component.html',
  styleUrls: ['./merchant-transaction.component.scss']
})
export class MerchantTransactionComponent implements OnInit {
  user: any;
  bazaar: any;
  transactions: any;
  selectedIdTransaction = [];
  constructor(
    private bazaarService: BazarService,
    private authentication: AuthenticationService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(this.authentication.currentEmployee());
    this.getBazaarByOwner();
  }

  checkbox(id) {
    if (this.selectedIdTransaction.includes(id)) {
      let key = this.selectedIdTransaction.indexOf(id);
      this.selectedIdTransaction.splice(key, 1);
    } else {
      this.selectedIdTransaction.push(id);
    }
  }

  getBazaarByOwner () {
    this.bazaarService.findBazaarByOwnerId(this.user.id).subscribe(callback => {
      this.bazaar = callback;
      console.log(this.bazaar)
      if (this.bazaar) {
        this.getTransactionByBazar();
      }
    });
  }

  getTransactionByBazar () {
      this.transactionService.findTransactionByBazar(this.bazaar.id).subscribe(callback => {
        this.transactions = callback;
        console.log(this.transactions)
      });
  }

  approve() {
    this.selectedIdTransaction.forEach((e, index) => {
      this.transactionService.approve(e).subscribe(callback => {
        if (index == (this.selectedIdTransaction.length - 1)) {
          this.getTransactionByBazar()
        }
      })
    })
  }

  decline() {
    this.selectedIdTransaction.forEach((e, index) => {
      if (index == (this.selectedIdTransaction.length - 1)) {
        this.getTransactionByBazar()
      }
    })
  }

}
