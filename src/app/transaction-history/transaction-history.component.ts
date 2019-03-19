import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {TransactionService} from '../service/transaction.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  user: any;
  transactionLists: any;
  shared: any;
  reward: any;
  bazaar: any;
  constructor(private auth: AuthenticationService, private transactionService: TransactionService) { }

  ngOnInit() {
    this.user = JSON.parse(this.auth.currentEmployee());
    this.findAllTransactionsById();
  }

  findAllTransactionsById() {
    this.transactionService.findAllTransactionByEmployeeId(this.user.id).subscribe(callback => {
      this.transactionLists = callback;
      this.shared = 0;
      this.bazaar = 0;
      this.reward = 0;
      for (let transaction of this.transactionLists) {
        transaction.transactiondate = new Date(transaction.transaction_date).getTime();
        switch (transaction.type) {
          case 'SHARED':
            if (transaction.to == this.user.name) {
              this.shared = this.shared + transaction.carrot_amt;
            } else {
              this.shared = this.shared - transaction.carrot_amt;
            }
            break;
            case 'REWARD':
            if (transaction.to == this.user.name) {
              this.reward = this.reward + transaction.carrot_amt;
            } else {
              this.reward = this.reward - transaction.carrot_amt;
            }
            break;
          case 'BAZAAR':
            this.bazaar = this.bazaar - transaction.carrot_amt;
            break;
        }
      }
      console.log(this.transactionLists);
    })
  }

}
