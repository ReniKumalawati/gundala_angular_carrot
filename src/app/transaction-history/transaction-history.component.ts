import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {TransactionService} from '../service/transaction.service';
import {EmployeeService} from '../service/employee.service';
import {calcBindingFlags} from '@angular/core/src/view/util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  user: any;
  currentBasket: any;
  transactionLists: any;
  shared: any;
  reward: any;
  bazaar: any;
  recentDob: any;
  shareForm: FormGroup;
  shareValue = {from: '', to: '',
                detail_to: {id: '', name: '', employee: {id:'', dob: '', name: ''}},
                detail_from: {id: '', name: '', employee: {id:'', name: '', dob: ''}},
                carrot_amt: 0, type: 'SHARED', description: ''};
  constructor(private auth: AuthenticationService,
              private transactionService: TransactionService,
              private  employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      detail_to: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      carrot_amt: ['', Validators.required],
    });
    this.user = JSON.parse(this.auth.currentEmployee());
    this.currentBasket = JSON.parse(this.auth.currentBasket());
    this.findAllTransactionsById();
    this.findAllRecentDob();
  }

  findAllRecentDob () {
    this.employeeService.findRecentDOBOfEmployee().subscribe(callback => {
      this.recentDob = callback;
      let i = 0;
      for (let dob of this.recentDob) {
        if(dob.employee.id == this.user.id) {
          this.recentDob.splice(i, 1);
        }
        i++;
        console.log(this.recentDob);
      }
    })
  }

  findAllTransactionsById() {
    this.transactionLists = [];
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

  submit() {
    delete this.shareValue.detail_to.employee.dob;
    this.shareValue.to = this.shareValue.detail_to.employee.name;
    this.shareValue.detail_from = this.currentBasket;
    this.shareValue.from = this.user.name;
    delete this.shareValue.detail_from.employee.dob;
    console.log(this.shareValue);
    this.transactionService.insertTansactionToDB(this.shareValue).subscribe(callback => {
      this.close();
      this.findAllTransactionsById();
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.modalService.dismissAll();
    this.shareForm.reset();
  }
}
