import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {BazarService} from '../service/bazar.service';
import {ItemServiceService} from '../service/item-service.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: any;
  bazar = [];
  constructor(
    private auth: AuthenticationService,
    private bazarService: BazarService,
    private itemService: ItemServiceService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.findBazar();
  }

  findBazar() {
    const group = this.employee.group;
    if (group.length > 0) {
      const bazars = [];
      let index = 1;
      for (let g of group) {
        if (g.bazaars !== undefined) {
          for (let b of g.bazaars) {
            b.items = [];
            this.bazar.push(b);
            bazars.push({id: b.id});
          }
        }
        if (index === group.length) {
          this.itemService.findItemByMultipleBazarId(bazars).subscribe(callback => {
            const item = callback;
            for (const singleItem of item) {
              const indexBazar = bazars.findIndex(x => x.id === singleItem.bazaar.id);
              if (indexBazar > -1) {
                this.bazar[indexBazar].items.push(singleItem);
              }
            }
          });
        }
        index++;
      }
    }
  }

}
