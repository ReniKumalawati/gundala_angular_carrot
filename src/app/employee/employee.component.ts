import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { BazarService } from '../service/bazar.service';
import { ItemServiceService } from '../service/item-service.service';
import { environment } from '../../environments/environment';
import { TransactionService } from '../service/transaction.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: any;
  bazar = [];
  sf = [];
  total = 0;
  basket: any;
  constructor(
    private auth: AuthenticationService,
    private bazarService: BazarService,
    private transactionService: TransactionService,
    private itemService: ItemServiceService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());
    this.findBazarAndSF();
    this.getTotalEarnedCarrot();
  }

  getTotalEarnedCarrot() {
    this.transactionService.getEarnedCarrot(this.basket.id).subscribe(callback => {
      const kembalian: any = callback;
      if (kembalian.length > 0) {
        this.total = kembalian[0].total;
      }
    });
  }

  findBazarAndSF() {
    const group = this.employee.group;
    if (group) {
      const bazars = [];
      let index = 1;
      for (const g of group) {
        if (g.bazaars !== undefined) {
          for (const b of g.bazaars) {
            b.items = [];
            this.bazar.push(b);
            bazars.push({ id: b.id });
          }
        }
        if (g.socialFoundations !== null && g.socialFoundations !== undefined) {
          for (const b of g.socialFoundations) {
            if (b.status === true) {
              this.sf.push(b);
            }
          }
        }

        if (index === group.length) {
          this.itemService.findItemByMultipleBazarId(bazars).subscribe(callback => {
            const item = callback;
            for (const singleItem in item) {
              if (item.hasOwnProperty(singleItem)) {
                const indexBazar = bazars.findIndex(x => x.id === item[singleItem].bazaar.id);
                if (indexBazar > -1) {
                  if ( item[singleItem].saleStatus === true ) {
                    this.bazar[indexBazar].items.push(item[singleItem]);
                  }
                }
              }
            }
          });
        }
        index++;
      }
    }
  }

}
