import { Component, OnInit } from '@angular/core';
import { FarmService} from "../service/farm.service";
import { EmployeeService} from "../service/employee.service";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  barnData: any;
  employee: any;
  freezer: any;
  total = 0;

  constructor(
    private farmService : FarmService,
    private auth: AuthenticationService,
    private empService: EmployeeService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.freezer = JSON.parse(this.auth.currentFreezer());

    this.findAllBarns();
    this.getTotalCarrotInFreezer();
  }

  findAllBarns(){
    this.farmService.findAllBarns().subscribe(callback =>{
      this.barnData = callback;
    })
  }
  getTotalCarrotInFreezer(){
    this.empService.findFrezeerByOwner(this.employee.id).subscribe(callback => {
      const freezer: any = callback;
      this.total = freezer.carrot_amt;
    })
  }
}
