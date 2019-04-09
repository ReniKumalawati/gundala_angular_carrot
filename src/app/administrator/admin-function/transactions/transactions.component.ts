import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../service/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  pendingTransactions: any;
  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.findAlPendingTransaction();
  }

  findAlPendingTransaction () {
    this.pendingTransactions = [];
    this.transactionService.findAllTransactionPending().subscribe(callbcak => {
      this.pendingTransactions = callbcak;
      this.pendingTransactions = this.pendingTransactions.listTransaction
    })
  }

  approve(id) {
    this.transactionService.approve(id).subscribe(callback => {
      this.findAlPendingTransaction();
    })
  }

  decline(id) {
    this.transactionService.decline(id).subscribe(callback => {
      this.findAlPendingTransaction();
    })
  }
}
