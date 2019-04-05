import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {EmployeeService} from '../service/employee.service';
import {ItemServiceService} from '../service/item-service.service';
import {ActivatedRoute} from '@angular/router';
import {TransactionService} from '../service/transaction.service';
import {callbackify} from 'util';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  basketData: any;
  basket: any;
  routeParam: any;
  item: any;
  employee: any;
  constructor(
    private auth: AuthenticationService,
    private employeeService: EmployeeService,
    private itemService: ItemServiceService,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.routeParam = this.route.params;
    this.basketData = JSON.parse(this.auth.currentBasket());
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.findBasketByEmployeeId();
    this.findItembyId();
  }

  findBasketByEmployeeId() {
    this.employeeService.findBasketByEmployeeId(this.basketData.id).subscribe(callback => {
      this.basket = callback;
      console.log(this.basket);
    })
  }

  findItembyId() {
    if (this.routeParam.value.id) {
      this.itemService.findItemById(this.routeParam.value.id).subscribe(callback => {
        var a = JSON.stringify(callback);
        var b = JSON.parse(a);
        this.item = b.item;
        console.log('aa' + b);
        console.log('bb' + b.item);
        console.log('cc' + JSON.stringify(this.item));
      })
    }
  }

  createTransaction() {
    let shareValue = {from: this.employee.name,
                      to: 'BAZAAR',
                      detail_from: this.basket,
                      carrot_amt: this.item.exchangeRate,
                      type: 'BAZAAR',
                      description: 'Buy an Item in ' + this.item.bazaar.bazaarName,
                      requested_item: this.item};
    delete shareValue.detail_from.employee.dob
    this.transactionService.insertTansactionToDB(shareValue).subscribe(callback => {
      console.log(callback);
      this.findBasketByEmployeeId();
    });
  }

}
