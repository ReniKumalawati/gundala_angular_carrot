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
  bazar: any;
  constructor(
    private auth: AuthenticationService,
    private bazarService: BazarService,
    private itemService: ItemServiceService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    console.log(this.employee);
    this.findBazar();
  }

  findBazar() {
    this.bazarService.findBazarByStatus(true).subscribe(callback => {
      this.bazar = callback;
      for (let bz of this.bazar) {
        bz.items = [];
        this.itemService.findItemByBazarId(bz.id).subscribe(callback => {
          bz.items = callback;
          console.log(callback);
        })
      }
    })
  }

}
