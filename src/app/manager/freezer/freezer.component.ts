import { Component, OnInit } from '@angular/core';
import {FarmService} from '../../service/farm.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {TransactionService} from '../../service/transaction.service';

@Component({
  selector: 'app-freezer',
  templateUrl: './freezer.component.html',
  styleUrls: ['./freezer.component.scss']
})
export class FreezerComponent implements OnInit {
  barn:any;
  routeParam: any;
  employee: any;
  transactionData:any;
  constructor(
    private route: ActivatedRoute,
    private barnService: FarmService,
    private auth: AuthenticationService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee())
    this.routeParam = this.route.params;
    this.findBarn()
  }

  findBarn() {
    this.barnService.findBarnById(this.routeParam.value.id).subscribe(callback => {
      this.barn = callback;
      this.barn = this.barn.barn
      this.barn.timestampStart = new Date(this.barn.startPeriod).getTime()
      this.barn.timestampEnd = new Date(this.barn.endPeriod).getTime()
      this.findAlltrans()
    })
  }

  findAlltrans() {
    this.transactionData = []
    if (this.employee.role === 'MANAGER') {
      this.transactionService.findAllTransactionByEmployeeId(this.employee.id).subscribe(callback => {
        let transaction: any = callback
        if (transaction.listTransaction){
          for(let tr of transaction.listTransaction) {
            tr.timestampDate = new Date(tr.transaction_date).getTime()
            if (tr.timestampDate >= this.barn.timestampStart && tr.timestampDate <= this.barn.timestampEnd) {
              if ((tr.freezer_from != undefined && tr.freezer_from != null && tr.freezer_from.employee.id === this.employee.id ) || (tr.freezer_to != undefined && tr.freezer_to != null && tr.freezer_to.employee.id === this.employee.id)) {
                this.transactionData.push(tr)
              }
            }
          }
        }
      })
    } else {
      this.findAllTransactionAdmin()
    }
  }

  findAllTransactionAdmin(){
    this.transactionService.findTransactionByStatusAndDate({type: false, from: this.barn.timestampStart, to: this.barn.timestampEnd}).subscribe(callback => {
      let transaction: any = callback
      console.log(transaction)
      if (transaction.listTransaction){
        for(let tr of transaction.listTransaction) {
          tr.timestampDate = new Date(tr.transaction_date).getTime()
          if (tr.timestampDate >= this.barn.timestampStart && tr.timestampDate <= this.barn.timestampEnd) {
            if (tr.freezer_from != null || tr.freezer_to != null || tr.barn != null) {
              this.transactionData.push(tr)
            }
          }
        }
      }
    })
  }

}
