import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {TransactionService} from '../service/transaction.service';
import {EmployeeService} from '../service/employee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../service/group.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  dn = ['BIRTHDAY', 'DONATION'];
  type = '';
  searchForm: FormGroup;
  user: any;
  currentBasket: any;
  transactionLists: any;
  shared: any;
  reward: any;
  bazaar: any;
  recentDob: any;
  employee: any;
  shareForm: FormGroup;
  sosFoundData = [];
  search = {type: 'ALL', from: '', to: ''};
  shareValue = {from: '', to: '',
                detail_to: {id: '', name: '', employee: {id:'', dob: '', name: ''}},
                detail_from: {id: '', name: '', employee: {id:'', name: '', dob: '', group: []}},
                carrot_amt: 0, type: 'SHARED', description: '', socialFoundation: {id: '', name: ''}};
  constructor(private auth: AuthenticationService,
              private transactionService: TransactionService,
              private  employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private groupService: GroupService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      detail_to: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      carrot_amt: ['', Validators.required],
    });

    this.searchForm = this.formBuilder.group({
      type: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
    this.user = JSON.parse(this.auth.currentEmployee());
    this.currentBasket = JSON.parse(this.auth.currentBasket());
    this.findAllTransactionsById();
    this.findAllRecentDob();
    this.findSocialFoundationByGroup()
  }

  findSocialFoundationByGroup () {
    const group = this.user.group;
    this.sosFoundData = [];
    if (group) {
      for (let g of group) {
        console.log(g)
        this.groupService.findById(g.id).subscribe(callback => {
          let data: any = callback;
          if (data.group.socialFoundations) {
            data.group.socialFoundations.forEach(e => {
              this.sosFoundData.push(e)
            })
          }
        });
      }
    }
  }

  findAllRecentDob () {
    console.log('findAllRecentDob');
    this.employeeService.findRecentDOBOfEmployee().subscribe(callback => {
      this.recentDob = callback;
      // console.log('callback' + callback);
      // console.log(JSON.stringify(callback));
      let i = 0;
      for (let dob of this.recentDob.listBasket) {
        // console.log('dob' + JSON.stringify(dob));
        if(dob.employee.id == this.user.id) {
          this.recentDob.splice(i, 1);
        }
        i++;
        // console.log('i' + i);
      }
      console.log('this recent dob: ' + JSON.stringify(this.recentDob));
      console.log('this recent dob.listbasket: ' + JSON.stringify(this.recentDob.listBasket));
      console.log('this recent dob.listbasket.employee: ' + JSON.stringify(this.recentDob.listBasket.employee));
    })
  }

  findAllTransactionsById() {
    this.transactionLists = [];
    this.transactionService.findAllTransactionByEmployeeId(this.user.id).subscribe(callback => {
      this.transactionLists = callback;
      this.shared = 0;
      this.bazaar = 0;
      this.reward = 0;
      if (this.transactionLists.listTransaction) {
        this.transactionLists = this.transactionLists.listTransaction
        for (let transaction of this.transactionLists.listTransaction) {
          transaction.transactiondate = new Date(transaction.transaction_date).getTime();
          switch (transaction.type) {
            case 'SHARED':
              if (transaction.from == this.user.name) {
                this.shared = this.shared + transaction.carrot_amt;
              }
              break;
            case 'DONATION':
              this.reward = this.reward + transaction.carrot_amt;
              break;
            case 'BAZAAR':
              if (transaction.satus == "APPROVED"){
                this.bazaar = this.bazaar + transaction.carrot_amt;
              }
              break;
          }
        }
      } else {
        this.transactionLists = []
      }
    })
  }

  submit() {
    this.shareValue.detail_from = this.currentBasket;
    this.shareValue.from = this.user.name;
    if (this.type === 'DONATION') {
      this.shareValue.type = this.type
      delete this.shareValue.detail_to;
      this.shareValue.to = this.shareValue.socialFoundation.name;
    } else {
      delete this.shareValue.detail_to.employee.dob;
      this.shareValue.to = this.shareValue.detail_to.employee.name;
    }
    delete this.shareValue.detail_from.employee.dob;
    delete this.shareValue.detail_from.employee.group;
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

  detect(e) {
    let split = e.split(' ');
    if (split.length > 1) {
      this.type = split[1]
    } else {
      this.type = ''
    }
  }

  doSearch() {
    let to = 0;
    let from = 0;
    if (this.search.to === '') {
      to = Date.now() * 1000
    } else{
      to = new Date(this.search.to).getTime()
    }

    if (this.search.from === '') {
      from = new Date('01-01-19970').getTime()
    } else {
      from = new Date(this.search.from).getTime()
    }
    this.transactionService.findTransactionByStatusAndDate({type: this.search.type, from: from, to: to})
      .subscribe(callback => {
        this.transactionLists = callback;
        if (this.transactionLists.listTransaction){
          this.transactionLists = this.transactionLists.listTransaction
          for (let transaction of this.transactionLists.listTransaction) {
            transaction.transactiondate = new Date(transaction.transaction_date).getTime();
          }
        } else{
          this.transactionLists = []
        }

      })
  }
}
