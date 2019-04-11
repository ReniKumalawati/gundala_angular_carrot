import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../service/transaction.service';

@Component({
  selector: 'app-farmer-transactions',
  templateUrl: './farmer-transactions.component.html',
  styleUrls: ['./farmer-transactions.component.scss']
})
export class FarmerTransactionsComponent implements OnInit {
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
    this.transactionService.approveRequest(id).subscribe(callback => {
      this.findAlPendingTransaction();
    })
  }

  decline(id) {
    this.transactionService.decline(id).subscribe(callback => {
      this.findAlPendingTransaction();
    })
  }
}
