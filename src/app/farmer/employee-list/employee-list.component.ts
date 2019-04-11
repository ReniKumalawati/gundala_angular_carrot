import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeData: any;
  admin: string = 'ADMIN';
  manager: string = 'MANAGER';
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.findAllEmployeeStaffAndAdmin()
  }

  findAllEmployeeStaffAndAdmin() {
    this.employeeService.findEmployeeByRoles([{role: 'STAFF'}, {role: 'ADMIN'}, {role: 'MANAGER'}]).subscribe(callback => {
      console.log(callback);
      this.employeeData = callback;
      this.employeeData = this.employeeData.listEmployee
    })
  }

  revoke(id) {
    this.employeeService.revoke(id).subscribe(callback => {
      this.findAllEmployeeStaffAndAdmin()
    })
  }

  assign(id,role) {
    console.log(id);
    console.log(role);
    this.employeeService.assign(id,role).subscribe(callback => {
      this.findAllEmployeeStaffAndAdmin()
    })
  }
}
