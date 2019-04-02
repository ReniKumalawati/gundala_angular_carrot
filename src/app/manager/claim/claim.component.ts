import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../service/transaction.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  transactionData: any;
  employee:any;
  constructor(
    private transactionService: TransactionService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee())
    this.findAllTransaction();
  }

  findAllTransaction () {
    this.transactionData = [];
    this.transactionService.findAllTransactionByEmployeeId(this.employee.id).subscribe(callback => {
      let transactionData: any = callback
      if (transactionData) {
        for (let transaction of transactionData) {
          if (transaction.type === 'REWARD') {
            this.transactionData.push(transaction)
          }
        }
      }
    })
  }

  approve(id) {
      this.transactionService.approve(id).subscribe(callback => {
        this.findAllTransaction()
      })
  }

  decline(id) {
    this.transactionService.decline(id).subscribe(callback => {
      this.findAllTransaction()
    })
  }

}
