import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { BazarService } from '../service/bazar.service';
import { EmployeeService} from "../service/employee.service";
import { ItemServiceService } from '../service/item-service.service';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-mini-dashboard',
  templateUrl: './mini-dashboard.component.html',
  styleUrls: ['./mini-dashboard.component.scss']
})
export class MiniDashboardComponent implements OnInit {
  employee: any;
  totalEarned = 0;
  totalInFreezer = 0;
  basket: any;

  constructor(
    private auth: AuthenticationService,
    private bazarService: BazarService,
    private transactionService: TransactionService,
    private empService: EmployeeService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());

    this.getTotalEarnedCarrot();
    this.getTotalCarrotInFreezer()
  }

  getTotalEarnedCarrot() {
    this.transactionService.getEarnedCarrot(this.basket.id).subscribe(callback => {
      const kembalian: any = callback;
      if (kembalian.length > 0) {
        this.totalEarned = kembalian[0].total;
      }
    });
  }

  getTotalCarrotInFreezer(){
    this.empService.findFrezeerByOwner(this.employee.id).subscribe(callback => {
      const freezer: any = callback;
      this.totalInFreezer = freezer.carrot_amt;
    })
  }

}
