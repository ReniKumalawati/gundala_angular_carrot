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
  searchForm: FormGroup;
  transactions: any;
  transactionsData = [];
  selectedIdTransaction = [];
  search = {item: 'ALL', status: 'ALL  ', from: '', to: ''};
  item = [];
  constructor(
    private bazaarService: BazarService,
    private authentication: AuthenticationService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.user = JSON.parse(this.authentication.currentEmployee());
    this.getBazaarByOwner();
    this.searchForm = this.formBuilder.group({
      item: ['', Validators.required],
      status: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
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
        this.item = [];
        this.transactionsData = [];
        for (let transaction of this.transactions.listTransaction) {
          transaction.transactiondate = new Date(transaction.transaction_date).getTime();
          this.transactionsData.push(transaction)
          if (this.item.indexOf(transaction.requested_item.itemName) < 0) {
            this.item.push(transaction.requested_item.itemName);
          }
        }
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
      this.transactionService.decline(e).subscribe(callback => {
        if (index == (this.selectedIdTransaction.length - 1)) {
          this.getTransactionByBazar()
        }
      })
    })
  }

  doSearch() {
    let from = 0;
    let to = 0;
    if (this.search.from != '') {
      from = new Date(this.search.from).getTime()
    } else {
      from = new Date('01-01-1970').getTime()
    }

    if (this.search.to != '') {
      to = new Date(this.search.to).getTime()
    } else {
      to = Date.now() * 1000
    }
    this.transactionsData = [];
    for(let transaction of this.transactions) {
      if (this.search.item != 'ALL') {
        if (transaction.requested_item.itemName === this.search.item && transaction.transactiondate >= from && transaction.transactiondate <= to) {
          if (this.search.status != 'ALL') {
            if (transaction.status === this.search.status) {
              this.transactionsData.push(transaction)
            }
          } else {
            this.transactionsData.push(transaction)
          }
        }
      } else {
        if (transaction.transactiondate >= from && transaction.transactiondate <= to) {
          if (this.search.status != 'ALL') {
            if (transaction.status === this.search.status) {
              this.transactionsData.push(transaction)
            }
          } else {
            this.transactionsData.push(transaction)
          }
        }
      }
    }
  }
}
