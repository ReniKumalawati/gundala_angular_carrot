import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-senior-manager',
  templateUrl: './senior-manager.component.html',
  styleUrls: ['./senior-manager.component.scss']
})
export class SeniorManagerComponent implements OnInit {

  managerData:any;
  constructor(
    private employeeService:EmployeeService,
  ) { }

  ngOnInit() {
  }

}
