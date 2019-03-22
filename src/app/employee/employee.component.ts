import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {BazarService} from '../service/bazar.service';
import {ItemServiceService} from '../service/item-service.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  url = environment.endpoint;
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
    if (group) {
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
            for (let singleItem in item) {
              if (item.hasOwnProperty(singleItem)) {
                const indexBazar = bazars.findIndex(x => x.id === item[singleItem].bazaar.id);
                if (indexBazar > -1) {
                  this.bazar[indexBazar].items.push(item[singleItem]);
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
