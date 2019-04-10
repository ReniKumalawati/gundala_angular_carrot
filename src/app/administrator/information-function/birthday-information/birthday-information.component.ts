import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-birthday-information',
  templateUrl: './birthday-information.component.html',
  styleUrls: ['./birthday-information.component.scss']
})
export class BirthdayInformationComponent implements OnInit {
  employeesList: any;
  // employee: Object;

  // employeeValue = {
  //   name: '',
  //   dob: '',
  //   role: ''
  // };

  constructor(
    private employeeServices: EmployeeService
  ) { }

  ngOnInit() {
    this.getAllEmployeesData();
  }

  getAllEmployeesData() {
    this.employeeServices.showAllEmployee().subscribe(callback => {
      this.employeesList = callback;
      this.employeesList = this.employeesList.listEmployee;
      console.log(this.employeesList);
    });
  }
}
