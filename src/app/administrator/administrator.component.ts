import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { EmployeeService} from "../service/employee.service";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {
  employee: any;
  total = 0;
  basket: any;

  constructor(
    private auth: AuthenticationService,
    private transactionService: TransactionService,
    private empService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());

  }

}
